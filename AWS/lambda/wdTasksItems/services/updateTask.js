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
    if(!id || !token || !name){
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
    
    // Verify the task owner
    const dynamoTask = await getTaskByUserID(id, userID);
    if(!dynamoTask){
      return utils.buildResponse(403, {
        message: 'Task does not exist !'
      });
    }

    // Update task to dynamoDB
    const _task = {
      name: name,
      status: (status) ? true : false,
    }

    const updateTaskResponse = await updateTaskContent(id, _task, userID);
    if(!updateTaskResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }
     
    return utils.buildResponse(200, {updated: true})
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

async function updateTaskContent(id, task) {
  const params = {
    TableName: itemTable,
    Key: {
        ID: id,
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