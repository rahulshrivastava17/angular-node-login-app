
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
let Users = require('../api/models/Users');

module.exports = {
  authenticate: (req, res, next) =>{
    // find the user
    Users.findOne({
      emailId: req.body.emailId
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch){
               res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else{
               // if user is found and password is right
              // create a token
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 1440
              });

              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Success',
                token: token,
                firstName:user.firstName,
                lastName: user.lastName ,
                emailId: user.emailId,
                contactNo: user.contactNo
              });
            }
        });
        // if (user.password != req.body.password) {
        //   res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        // } else {

        // }   

      }

    });
  }
}
//});