import nodemailer from 'nodemailer'
import envConfigObject from './dotenv.config.js'

export const transport  = nodemailer.createTransport({
    service: "gmail",
    port: 578,
    auth:{
        user: "mauro.leonardi87@gmail.com",
        pass: envConfigObject.google_app_password
    }
})