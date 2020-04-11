const AuthStore = require('../store/authentication.store');
module.exports = function(app) {
    app.use('/api/v1', require('./routes.unauth'));
    app.use('/api/v1/blog', require('./routes.blogger.unauth'));
    app.use('/api/v1/tag', require('./routes.tag.unauth'));
    app.use('/api/v1/auth/blog', [AuthStore.authenticate], require('./routes.blogger.auth'));
    
};