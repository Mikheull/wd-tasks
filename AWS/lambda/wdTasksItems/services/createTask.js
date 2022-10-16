const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const itemTable = 'wd-tasks-items';

async function createTask(task) {
    const token = task.token;
    const name = task.name;
    
    // Verify required parameteres
    if(!token || !name){
      return utils.buildResponse(401, {
        message: 'All fields are required'
      });
    }

    // Verify token
    const verification = auth.verifyToken(token)
    if(!verification.verified){
      return utils.buildResponse(401, verification)
    }
    
    // Save task to dynamoDB
    const id = uuid.v4();
    const _task = {
      ID: id,
      name: name,
      status: false,
      userId: verification.userId
    }

    const saveTaskResponse = await saveTask(_task);
    if(!saveTaskResponse){
      return utils.buildResponse(503, {
        message: 'Server error. Please try again later !'
      });
    }
     
    return utils.buildResponse(200, {task: _task})
}

async function saveTask(task) {
  const params = {
    TableName: itemTable,
    Item: task
  }

  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => {
    console.log('There is an error saving task: ', error)
  })
}

module.exports.createTask = createTask;