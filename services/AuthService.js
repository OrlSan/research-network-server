module.exports = {
  
  isAuthenticated: (req, res, next)=> {
    if (req.headers.token) {
      User.findOne({ where: { token: req.headers.token }})
      .then(user => {
        return next();
      })
      .catch(err => {
        res.status(401).json({
          msg: 'Unauthorized'
        });
      });
    } else {
      res.status(401).json({
        msg: 'Unauthorized'
      });
    } 
  }
};
