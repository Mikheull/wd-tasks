const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'wd-tasks-users';

async function updateProfile(profile) {
    const token = profile.token;
    const username = profile.username;
    const email = profile.email;
    
    // Verify required parameteres
    if(!token || !username || !email){
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

    // Update profile to dynamoDB
    const _profile = {
      username: username,
      email: email,
    }

    const updateProfileResponse = await updateProfileContent(userID, _profile);
    if(!updateProfileResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }

    // ReGenerate JWT token
    const userInfo = {
      ID: userID,
      email: email,
      attachmentUrl: dynamoUser.attachmentUrl,
      username: username
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

async function updateProfileContent(id, profile) {
  const params = {
    TableName: userTable,
    Key: {
        ID: id,
    },
    UpdateExpression: "set #Username = :username, #Email = :email",
    ExpressionAttributeNames: {
        "#Username": "username",
        "#Email": "email",
    },
    ExpressionAttributeValues: {
        ":username": profile.username,
        ":email": profile.email
    }
  }

  return await dynamodb.update(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error updating profile: ', error)
  })
}

module.exports.updateProfile = updateProfile;