var express = require('express');
var router = express.Router();

// router.route('/', passport.authenticate('local', { failureRedirect: '/login' }))
//   .post((err, user, details) => {
//     console.log('user', user);
//     console.log(1);
//     res.json({});
//     res.status(200);
//   });
  
// module.exports = router;
  
router.post('/', (req, res, next) => {
  return passport.authenticate(
    'local',
    {session: true}, 
    (err, user, details) => {
      if (user) {
        // console.log('123');
        // res.json({});
        // res.status(200);
        req.logIn(user, function(err, user) {
          console.log('42');
          req.user = user;
          res.json({});
          res.status(200);
        })
      }
    })(req, res, next)
});
module.exports = router;