const registerService = require('./services/register');
const loginService = require('./services/login');
const verifyService = require('./services/verify');

const utils = require('./utils/utils');

exports.handler = async (event) => {
    let response;
    
    switch(true) {
        case event.httpMethod === 'GET' && event.path === "/health":
            response = utils.buildResponse(200);
            break;
            
        case event.httpMethod === 'POST' && event.path === "/register":
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
            
        case event.httpMethod === 'POST' && event.path === "/login":
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            break;
            
        case event.httpMethod === 'POST' && event.path === "/verify":
            const verifyBody = JSON.parse(event.body);
            response = await verifyService.verify(verifyBody);
            break;
            
        default:
            response = utils.buildResponse(404, '404 Not Found')
    }
    
    return response;
};
