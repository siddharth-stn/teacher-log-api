require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const PassportJWT = require("passport-jwt");
const JWTStrategy = PassportJWT.Strategy;
const ExtractJWT = PassportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

/* Set up Passport to use local strategy for checking the user credentials in the database */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Wrong email id!" });
        } else if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false, {
            message: "Wrong email and password combination",
          });
        } else {
          return done(null, user, { message: "Logged in Successfully" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

/* Set up passport to use JWT strategy to authenticate users in subsequent requests after login */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        let user = await User.findOneById(jwtPayload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
