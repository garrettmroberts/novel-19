// Middleware for restricting routes that only a logged in user may see
module.exports = function(req, res, next) {
  // If user is loggen in, continue with request to restricted route
  if (req.user) {
    return next();
  }
  // If user isn't logged in, redirect to login page.
  return res.redirect('/');
};
