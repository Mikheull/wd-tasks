const jwt = require('jsonwebtoken');

function generateToken(user){
    if(!user){
        return null;
    }

    const userInfo = {
        id: user.ID,
        email: user.email,
        user: user.username
    }

    return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '12h'})
}

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

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;