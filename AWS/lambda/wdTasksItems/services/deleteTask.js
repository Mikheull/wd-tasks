const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = 'wd-tasks-items';

async function deleteTask(id, queryparams) {
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

    // Verify the task owner
    const _dynamoTask = await getTaskByUserID(id, userID);
    if(!_dynamoTask){
      return utils.buildResponse(403, {
        message: 'Task does not exist !'
      });
    }

    // Delete task to dynamoDB
    const dynamoTask = await deleteTaskByID(id, userID);
    if(!dynamoTask){
      return utils.buildResponse(403, {
        message: 'Task does not exist !'
      });
    }
     
    return utils.buildResponse(200, {deletion: dynamoTask})
}

async function getTaskByUserID(id, userID) {
  const params = {
    TableName: itemTable,
    FilterExpression: "ID = :id AND userId = :userID",
    ExpressionAttributeValues: {
      ":id": id,
      ":userID": userID,
    }
  }

  return await dynamodb.scan(params).promise().then(response => {
    return response.Items[0];
  }, error => {
    console.log('There is an error getting task: ', error)
  })
}


async function deleteTaskByID(id, userID) {
  const params = {
    TableName: itemTable,
    Key: {
      ID: id,
    },
  }

  return await dynamodb.delete(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error deleting task: ', error)
  })
}

module.exports.deleteTask = deleteTask;