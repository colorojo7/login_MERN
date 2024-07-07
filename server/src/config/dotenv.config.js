import dotenv from "dotenv";
import program from "../utils/comander.js"; 

const { mode } = program.opts(); 

dotenv.config({
    path: mode ==="production" ? "./.env.production" : "./.env.development"
});

const envConfigObject = {
    mode:process.env.MODE,
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    
    
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

    registrationCookie: process.env.REGISTRATION_COOKIE,
    authCookie:process.env.AUTH_COOKIE,
    
    google_app_password: process.env.GOOGLE_APP_PASSWORD,

};

export default envConfigObject;