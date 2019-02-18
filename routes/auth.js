var express = require('express');
var router = express.Router();
  
router.route('/')
  .post((req, res, next) => {
  console.log('REQ', req.sessionID);
  return passport.authenticate(
    'local',
    {session: true}, 
    (err, user, details) => {
      if (user) {
        req.login(user, function(err) {
          console.log('user', user);
          res.redirect('/users/' + user.id);
        });
      }
    })(req, res, next)
});
module.exports = router;