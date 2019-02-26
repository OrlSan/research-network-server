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
      let email = req.body.email;
      let password = req.body.password;
      let foundUser;
      const randomToken = randomID();
      User.findOne({
        where: { 
          email: email
      }})
      .then(resultUser => {
        foundUser = resultUser.dataValues;
        if (foundUser === null) {
          throw new Error('InvalidCredentials');
        } else {
          bcrypt.compare(password, foundUser.password, (err, result) => {
            if (result) {
              return User.update(
                { token: randomToken },
                { where: {
                    email: email,
                    password: foundUser.password
                }});
            } else {
              return res.status(401).send({ error: 'Invalid credentials'});
            }
          });
        }
      })
      .then(() => {
        return User.findOne(
          { where: { 
              email: email,
              password: foundUser.password
          }});
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
				if (err.message === 'InvalidCredentials') {
					return res.status(401).send({ error: 'Invalid credentials'});					
				}
				res.status(500).send({ error: 'something blew up' });
			});
    })(req, res, next)
});
module.exports = router;
