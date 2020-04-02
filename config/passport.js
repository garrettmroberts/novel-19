const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

// Set up the local strategy that passport will use. The strategy requires a 'verify'
// callback, which accepts these credentials and calls 'done' providing a user
passport.use(new LocalStrategy(
  async (username, password, done) => {
    // When a user tries to sign in, check if username is in database
    console.log('username: ' + username);
    console.log('password: ' + password);
    const dbUser = await db.User.findOne({
      where: {
        username: username
      }
    });
    console.log('inside then');
    console.log(dbUser);
    // if (err) { return done(err); }
    // There was no user with the given username
    if (!dbUser) {
      console.log('username not found')
      return done(null, false, { message: 'Userame does not exist.' });
    }
    // There was a user with the given username, but the password was incorrect
    const func = await dbUser.validPassword(password);
    if (!func) {
      console.log('password not correct');
      return done(null, false, { message: 'Password was incorrect.' });
    }
    // Username and password were both correct
    console.log('user was found');
    return done(null, dbUser);
  }
));

// Each subsequent request will not contain credentials, but rather the unique cookie
// that identifies the session. In order to support login sessions, Passport will serialize
// and deserialize 'user' intances to and from the session. We will only serialize the user
// ID to the session, keeping the amount of data stored within the session small. When
// subsequent requests are recieved, this ID is used to find the user, which will be restored
// to 'req.user'.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.User.findOne({
    where: {
      id: user.id
    }
  },
  (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
