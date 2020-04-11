const AuthModel = require('../model/auth.model');
class AuthController {
    static async register(req, res) {
      AuthModel.registerUser(req, res)
       
   }

   static async login(req, res) {
    
      await AuthModel.loginUser(req.body, res);
     
   }
}

module.exports = AuthController;
