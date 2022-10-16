const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = 'wd-tasks-items';

async function getTasks(body) {
    const token = body.token

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
    
    // Get related user tasks to dynamoDB
    const dynamoTasks = await getUserTasks(userID);
    if(!dynamoTasks){
      return utils.buildResponse(403, {
        message: 'The user has no tasks !'
      });
    }
     
    return utils.buildResponse(200, {tasks: dynamoTasks})
}

async function getUserTasks(userID) {
  const params = {
    TableName: itemTable,
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userID,
    }
  }

  return await dynamodb.scan(params).promise().then(response => {
    return response.Items;
  }, error => {
    console.log('There is an error getting tasks user: ', error)
  })
}

module.exports.getTasks = getTasks;