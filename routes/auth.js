var express = require('express');
var router = express.Router();
  
router.route('/')
  .post((req, res, next) => {
  return passport.authenticate(
    'bearer',
    (err, user, details) => {
      console.log('BODY', req.body);
      let email = req.body.email;
      let password = req.body.password;
      // create token field on users table
      //@TODO generate token
      // update to user table 
      // set to token
      User.findOne({ where: { email: email, password: password}})
		  .then(user => {
        user.token = 'asd';
        res.json(user);
      });
      
    })(req, res, next)
});
module.exports = router;
