var express = require('express');
var router = express.Router();
  
router.post('/', (req, res, next) => {
  console.log('REQ', req.sessionID);
  return passport.authenticate(
    'local',
    {session: true}, 
    (err, user, details) => {
      if (user) {
        req.login(user, function(err) {
          res.json(user);
          res.status(200);
        })
      }
    })(req, res, next)
});
module.exports = router;