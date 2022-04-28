const jwt = require('jsonwebtoken')

module.exports = function() {
    return function (id, email, role) {
        return jwt.sign(
            {id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
    }
}


