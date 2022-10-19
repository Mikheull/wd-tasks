const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'wd-tasks-users';

async function updateAvatar(data) {
    const token = data.token;
    const attachmentUrl = data.attachmentUrl;
    
    // Verify required parameteres
    if(!token){
      return utils.buildResponse(401, {
        message: 'All fields are required'
      });
    }

    // Verify token
    const verification = auth.verifyToken(token)
    if(!verification.verified){
      return utils.buildResponse(401, verification)
    }
    const userID = verification.userId;

     // Get user exist
    const dynamoUser = await getUser(userID);
    if(!dynamoUser || !dynamoUser.email){
       return utils.buildResponse(403, {
         message: 'Email does not exist !'
       });
    }
 
   
    // Update user avatar to dynamoDB
    const _avatarUrl = {
        attachmentUrl: attachmentUrl,
    }

    const updateAvatarResponse = await updateAvatarContent(userID, _avatarUrl);
    if(!updateAvatarResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }

    // ReGenerate JWT token
    const userInfo = {
        ID: userID,
        attachmentUrl: attachmentUrl,
        email: dynamoUser.email,
        username: dynamoUser.username
    }
    const newtoken = auth.generateToken(userInfo);
   
    // Send response to client
    const response = utils.buildResponse(200, {
        user: userInfo,
        updated: true,
        token: newtoken
    })
       
    return response
}


async function getUser(userID) {
  const params = {
    TableName: userTable,
    FilterExpression: "ID = :id",
    ExpressionAttributeValues: {
      ":id": userID,
    }
  }

  return await dynamodb.scan(params).promise().then(response => {
    return response.Items[0];
  }, error => {
    console.log('There is an error getting user: ', error)
  })
}

async function updateAvatarContent(id, profile) {
  const params = {
    TableName: userTable,
    Key: {
        ID: id,
    },
    UpdateExpression: "set #AttachmentUrl = :attachmentUrl",
    ExpressionAttributeNames: {
        "#AttachmentUrl": "attachmentUrl",
    },
    ExpressionAttributeValues: {
        ":attachmentUrl": profile.attachmentUrl,
    }
  }

  return await dynamodb.update(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error updating avatar: ', error)
  })
}

module.exports.updateAvatar = updateAvatar;