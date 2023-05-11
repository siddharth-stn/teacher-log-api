const passport = require("passport");
const LocalStrategy = require("passport-local");
const PassportJWT = require("passport-jwt");
const JWTStrategy = PassportJWT.Strategy;
const ExtractJWT = PassportJWT.ExtractJWT;

/* Set up Passport to use local strategy for checking the user credentials in the database */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Wrong email id!" });
        } else if (user.password != password) {
          return done(null, false, {
            message: "Wrong email and password combination",
          });
        } else {
          return done(null, user, { message: "Logged in Successfuly" });
        }
      });
    }
  )
);

/* Set up passport to use JWT strategy to authenticate users in subsequent requests after login */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "SECRET_KEY",
    },
    (jwtPayload, done) => {
      User.findOneById(jwtPayload.id, (err, user) => {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

module.exports = passport;
