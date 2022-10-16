const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-3'
})

const utils = require('../utils/utils');
const auth = require('../utils/auth');

async function verify(requestBody) {
    const user = requestBody.user;
    const token = requestBody.token;
    
    // Verify required parameteres
    if(!user || !token){
      return utils.buildResponse(401, {
        verified: false,
        message: 'incorrect request body'
      })
    }
    
    // Verify token
    const verification = auth.verifyToken(user.email, token)
    if(!verification.verified){
      return utils.buildResponse(401, verification)
    }

    // Send response to client
    const response = utils.buildResponse(200, {
      verified: true,
      message: 'success',
      user: user, 
      token: token
    })
    return response
}


module.exports.verify = verify;