const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'wd-tasks-users';

async function login(user) {
    const email = user.email;
    const password = user.password;
    
    // Verify required parameteres
    if(!email || !password){
        return utils.buildResponse(401, {
            message: 'All fields are required'
        });
    }
    
    // Verify user exist
    const dynamoUser = await getUser(email);
    if(!dynamoUser || !dynamoUser.email){
      return utils.buildResponse(403, {
        message: 'Email does not exist !'
      });
    }

    // Verify Encrypt password
    if(!bcrypt.compareSync(password, dynamoUser.password)){
      return utils.buildResponse(403, {
        message: 'Password is incorrect !'
      })
    }
    
    // Generate JWT token
    const userInfo = {
      ID: dynamoUser.ID,
      email: dynamoUser.email,
      attachmentUrl: dynamoUser.attachmentUrl,
      username: dynamoUser.username
    }
    const token = auth.generateToken(userInfo);
 
    // Send response to client
    const response = utils.buildResponse(200, {
      user: userInfo,
      token: token
    })
    
    return response
}


async function getUser(email) {
  const params = {
    TableName: userTable,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    }
  }

  return await dynamodb.scan(params).promise().then(response => {
    return response.Items[0];
  }, error => {
    console.log('There is an error getting user: ', error)
  })
}

module.exports.login = login;