const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = 'wd-tasks-items';

async function getTask(id, queryparams) {
    // Verify required parameteres
    if(!id || !queryparams || !queryparams.token){
      return utils.buildResponse(401, {
        message: 'All fields are required'
      });
    }

    const token = queryparams.token;
    
    // Verify token
    const verification = auth.verifyToken(token)
    if(!verification.verified){
      return utils.buildResponse(401, verification)
    }
    const userID = verification.userId;
    
    // Get task to dynamoDB
    const dynamoTask = await getTaskContent(id, userID);
    if(!dynamoTask){
      return utils.buildResponse(403, {
        message: 'The task has not been found !'
      });
    }
     
    return utils.buildResponse(200, {task: dynamoTask})
}

async function getTaskContent(id, userID) {
  const params = {
    TableName: itemTable,
    FilterExpression: "ID = :id AND userId = :userId",
    ExpressionAttributeValues: {
      ":id": id,
      ":userId": userID,
    }
  }

  return await dynamodb.scan(params).promise().then(response => {
    return response.Items;
  }, error => {
    console.log('There is an error getting task: ', error)
  })
}

module.exports.getTask = getTask;