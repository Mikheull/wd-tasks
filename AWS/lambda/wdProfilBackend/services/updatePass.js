const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'wd-tasks-users';

async function updatePass(data) {
    const token = data.token;
    const old_password = data.old_password;
    const password = data.password;
    
    // Verify required parameteres
    if(!token || !old_password || !password){
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
 
    // Verify Encrypt password
    if(!bcrypt.compareSync(old_password, dynamoUser.password)){
       return utils.buildResponse(403, {
         message: 'Password is incorrect !'
       })
     }
    
    // Update user password to dynamoDB
    const encryptedPwd = bcrypt.hashSync(password.trim(), 10)
    const _password = {
      password: encryptedPwd,
    }

    const updatePasswordResponse = await updatePasswordContent(userID, _password);
    if(!updatePasswordResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }
     
    return utils.buildResponse(200, {updated: true})
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

async function updatePasswordContent(id, profile) {
  const params = {
    TableName: userTable,
    Key: {
        ID: id,
    },
    UpdateExpression: "set #Password = :password",
    ExpressionAttributeNames: {
        "#Password": "password",
    },
    ExpressionAttributeValues: {
        ":password": profile.password,
    }
  }

  return await dynamodb.update(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error updating password: ', error)
  })
}

module.exports.updatePass = updatePass;