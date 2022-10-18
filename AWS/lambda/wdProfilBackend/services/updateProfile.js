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