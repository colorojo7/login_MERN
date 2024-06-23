import dotenv from "dotenv";
import program from "../utils/comander.js"; 

const { mode } = program.opts(); 

dotenv.config({
    path: mode ==="production" ? "./.env.production" : "./.env.develop"
});

const envConfigObject = {
    mongo_url: process.env.MONGO_URL,
    port: process.env.PORT,
    secret_word:process.env.SECRET_WORD,
    cookie_user:process.env.COOKIE_NAME_USER,
    mode:process.env.MODE,
    google_app_password: process.env.GOOGLE_APP_PASSWORD,

};

export default envConfigObject;