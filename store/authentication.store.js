const jwt = require('jsonwebtoken');
class AuthStore {
    static authenticate(req, res, next) {
        let token = req.headers.token;
        jwt.verify(token, 'hello_secret', function(err, decode) {
            if (err) return res.status(403).json({status: false, err: err});
            
            if (decode.userId) {
                res.locals.userId = decode.userId
                next();
            }
        })
       
    }
}

module.exports = AuthStore;