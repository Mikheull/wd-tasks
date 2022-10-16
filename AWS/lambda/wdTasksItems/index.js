const createTaskService = require('./services/createTask');
const getTasksService = require('./services/getTasks');
const getTaskService = require('./services/getTask');
const deleteTaskService = require('./services/deleteTask');
const updateTaskService = require('./services/updateTask');

const utils = require('./utils/utils');

exports.handler = async (event) => {
    let response;
    
    switch(true) {
        case event.httpMethod === 'POST' && event.path === "/tasks":
            const getTasksBody = JSON.parse(event.body);
            response = await getTasksService.getTasks(getTasksBody);
            break;

        case event.httpMethod === 'GET' && event.resource === "/task/{id}":
            response = await getTaskService.getTask(event.pathParameters.id, event.queryStringParameters);
            break;

        case event.httpMethod === 'POST' && event.path === "/task":
            const createTaskBody = JSON.parse(event.body);
            response = await createTaskService.createTask(createTaskBody);
            break;

        case event.httpMethod === 'PATCH' && event.resource === "/task/{id}":
            const updateTaskBody = JSON.parse(event.body);
            response = await updateTaskService.updateTask(event.pathParameters.id, updateTaskBody);
            break;

        case event.httpMethod === 'DELETE' && event.resource === "/task/{id}":
            response = await deleteTaskService.deleteTask(event.pathParameters.id, event.queryStringParameters);
            break;
            
        default:
            response = utils.buildResponse(404, '404 Not Found')
    }
    
    return response;
};
