const jwt = require('jsonwebtoken')

//function for jwt token for todo application generation for individual user
module.exports.generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET, {
        expiresIn: 3* 24 * 60 * 60 * 1000
    });
};

