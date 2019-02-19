var express = require('express');
var router = express.Router();
  
router.route('/')
  .post((req, res, next) => {
  console.log('REQ SESSION1', req.sessionID);
  return passport.authenticate(
    'local',
    {session: true}, 
    (err, user, details) => {
      if (user) {
        console.log('REQ SESSION2', req.sessionID);
        console.log('REQ SESSION2', req.session.passport);
        req.login(user, function(err) {
          console.log('user', user);
          console.log('REQ SESSION3', req.sessionID);
          console.log('REQ SESSION3', req.session.passport);
          req.user = user;
          console.log('REQ USER1', req.user);
          // req.session.save(function(){
            //return res.json({});
            return res.redirect('/users/' + user.id);
          // });
          //return res.redirect('/users/' + user.id);
        });
      }
    })(req, res, next)
});
module.exports = router;