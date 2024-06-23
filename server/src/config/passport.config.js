import passport from "passport";
import passportJWT from "passport-jwt";
import envConfigObject from "./dotenv.config.js";

//Create strategy
const jwtStrategy = passportJWT.Strategy;

//To decode de token that is in the cookie.
const ExtractJwt = passportJWT.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: envConfigObject.secret_word,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

// create our cookieExtractor function
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[envConfigObject.cookie_user];
  }
  return token;
};


export default initializePassport;
