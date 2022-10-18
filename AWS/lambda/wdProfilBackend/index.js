const updateProfileService = require('./services/updateProfile');
const updatePassService = require('./services/updatePass');
const utils = require('./utils/utils');

exports.handler = async (event) => {
    let response;
    
    switch(true) {
        case event.httpMethod === 'PATCH' && event.path === "/profile":
            const updateProfileBody = JSON.parse(event.body);
            response = await updateProfileService.updateProfile(updateProfileBody);
            break;
        case event.httpMethod === 'POST' && event.path === "/profile/password":
            const updatePassBody = JSON.parse(event.body);
            response = await updatePassService.updatePass(updatePassBody);
            break;
            
        default:
            response = utils.buildResponse(404, '404 Not Found')
    }
    
    return response;
};
