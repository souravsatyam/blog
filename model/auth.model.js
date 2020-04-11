const UserSchema = require('../schema/UserSchema');
const jwt = require('jsonwebtoken');
class AuthModel {
  static async registerUser(data, res) {
    try {
      console.log(data);
      
      var testUser = new UserSchema({
          email: data.body.email,
          userName: data.body.userName,
          password: data.body.password
      });
    
    // save user to database
      testUser.save(function(err) {
          if (err) {
            return res.status(403).json({status: true, message: err});
          }
          return res.status(200).json({status: true, message: "Thank you for registring with us"});
      });
     
    } catch (err) {
        return res.status(403).json({status: true, message: err});
    }
  }

  static async loginUser(data, res) {
      UserSchema.findOne({userName: data.userName}, function(err, user) {
      
         
          if (user) {
            user.comparePassword(data.password, function(err, isMatch) {
              if (err) throw err;
              if (isMatch) {
                jwt.sign({userId: user._id}, 'hello_secret', function(err, token) {
                  return res.status(200).json({status: true, data: "Logged in successfully", token: token, id: user._id});
                });
              } else {
                return res.status(403).json({status: false, data: "Invalid Credential"});
              }
          });
          } else {
            return res.status(403).json({status: false, data: "Invalid Credential"});
          }
          
      })
  }
}

module.exports = AuthModel;
