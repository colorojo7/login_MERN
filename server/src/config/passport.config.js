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
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractorAuth,cookieExtractorReg]),
        secretOrKey: envConfigObject.accessTokenSecret,
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

// create our cookieExtractors function
const cookieExtractorAuth = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[envConfigObject.authCookie];
  }
  return token;
};
const cookieExtractorReg = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[envConfigObject.registrationCookie];
  }
  return token;
};


export default initializePassport;
