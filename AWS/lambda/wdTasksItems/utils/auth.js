const jwt = require('jsonwebtoken');

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if(error){
            return {
                verified: false,
                userId: null,
                message: 'invalid token'
            }
        }
        
        return {
            verified: true,
            userId: response.id,
            message: 'verified'
        }
    })
}

module.exports.verifyToken = verifyToken;