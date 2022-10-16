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
    
    // Delete task to dynamoDB
    const dynamoTask = await deleteTaskByID(id, userID);
    if(!dynamoTask){
      return utils.buildResponse(403, {
        message: 'Task does not exist !'
      });
    }
     
    return utils.buildResponse(200, {deletion: dynamoTask})
}

async function deleteTaskByID(id, userID) {
  const params = {
    TableName: itemTable,
    Key: {
      ID: id,
      //userId: userID,
    },

  }

  return await dynamodb.delete(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error deleting task: ', error)
  })
}

module.exports.deleteTask = deleteTask;