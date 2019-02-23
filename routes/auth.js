var express = require('express');
var router = express.Router();
  
randomID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

router.route('/')
  .post((req, res, next) => {
  return passport.authenticate(
    'bearer',
    (err, user, details) => {
      console.log('BODY', req.body);
      let email = req.body.email;
      let password = req.body.password;
      const randomToken = randomID();
      console.log('randomToken', randomToken);
      // create token field on users table
      //@TODO generate token
      // update to user table 
      // set to token
      User.findOne({
        where: { 
          email: email,
          password: password
      }})
      .then(result => {
        if (result === null) {
          throw new Error('InvalidCredentials');
        } else {
          return User.update(
            { token: randomToken },
            { where: { 
                email: email,
                password: password
            }});
        }
      })
      .then(() => {
        return User.find(
          { where: { 
              email: email,
              password: password
          }});
      })
      .then(user => {
        user.token = user.token;
        res.json(user);
      })
    })(req, res, next)
});
module.exports = router;
