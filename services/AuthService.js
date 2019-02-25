module.exports = {
  
  isAuthenticated: (req, res, next)=> {
    // req.isAthenticated
    if (req.headers.token) {
      return next();
    } else {
      res.status(401).json({
        msg: 'Unauthorized'
      });
    } 
  }
};
