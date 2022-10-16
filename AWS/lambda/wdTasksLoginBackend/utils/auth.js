const jwt = require('jsonwebtoken');

function generateToken(user){
    if(!user){
        return null;
    }

    const userInfo = {
        id: user.ID,
        email: user.email
    }

    return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h'})
}


function verifyToken(email, token){
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if(error){
            return {
                verified: false,
                message: 'invalid token'
            }
        }
        
        if(response.email !== email){
            return {
                verified: false,
                message: 'invalid email'
            }
        }

        return {
            verified: true,
            message: 'verified'
        }
    })
}


module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;