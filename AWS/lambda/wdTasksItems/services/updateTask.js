const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = 'wd-tasks-items';

async function updateTask(id, task) {
    const token = task.token;
    const status = task.status;
    const name = task.name;
    
    // Verify required parameteres
    if(!id || !status || !token || !name){
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
    
    // Update task to dynamoDB
    const _task = {
      name: name,
      status: status,
    }

    const updateTaskResponse = await updateTaskContent(id, task, userID);
    if(!updateTaskResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }
     
    return utils.buildResponse(200, {updated: true})
}

async function updateTaskContent(id, task, userID) {
  const params = {
    TableName: itemTable,
    Key: {
        ID: id,
        // userId: userID,
    },
    UpdateExpression: "set #Name = :name, #Status = :status",
    ExpressionAttributeNames: {
        "#Name": "name",
        "#Status": "status",
    },
    ExpressionAttributeValues: {
        ":name": task.name,
        ":status": task.status
    }
  }

  return await dynamodb.update(params).promise().then(response => {
    return true;
  }, error => {
    console.log('There is an error saving task: ', error)
  })
}

module.exports.updateTask = updateTask;