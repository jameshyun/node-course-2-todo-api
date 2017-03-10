var {User} = require('./../models/user');

/*#################  AUTH MIDDLEWARE ###################################################*/
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  //model method - find who has specific token
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); // this code will automactically stop here and run the error case
    }

   req.user = user;
   req.token = token;
   next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};