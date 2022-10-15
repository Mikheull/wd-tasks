const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'wd-tasks-users';

async function register(userInfo) {
    const email = userInfo.email;
    const password = userInfo.password;
    
    // Verify required parameteres
    if(!email || !password){
        return utils.buildResponse(401, {
            message: 'All fields are required'
        });
    }
    
    // Verify user exist
    const dynamoUser = await getUser(email);
    if(dynamoUser && dynamoUser.email){
      return utils.buildResponse(401, {
        message: 'Email already exist in our database. Please choose a different email !'
      });
    }

    // Encrypt password
    const encryptedPwd = bcrypt.hashSync(password.trim(), 10)
    const user = {
      ID: uuid.v4(),
      email: email, 
      password: encryptedPwd 
    }

    // Save user to dynamoDB
    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }
    
    return utils.buildResponse(200, {email: email})
}


async function getUser(email) {
  const params = {
    TableName: userTable,
    Key: {
      "email": {"S": email}, 
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    console.log("GetUser response item : ", response.Item)
    return response.Item;
  }, error => {
    console.log('There is an error getting user: ', error)
  })
}


async function saveUser(user) {
  const params = {
    TableName: userTable,
    Item: user
  }

  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => {
    console.log('There is an error saving user: ', error)
  })
}

module.exports.register = register;