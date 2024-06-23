//import helmet from "helmet";
//import morgan from "morgan";
//import dotenv from "dotenv";


import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser'
import passport from "passport";

import initializePassport from './config/passport.config.js'
import './data/db.js'
import envConfigObject from './config/dotenv.config.js'

import usersRouter from './routes/userRouter.js'


const app = express()
const PUERTO = envConfigObject.port; 
const MODE =    envConfigObject.mode; 

/* CONFIGURATION */
//dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: 'http://localhost:4000', // frontend URL
    credentials: true, // Permitir enviar cookies y encabezados de autenticación HTTP
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

/* CONFIGURATION HELMET & MORGAN to be reserched */
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));

/* ROUTES */


app.get("/", (req, res)=>{
    res.send("Server working fine")
})

app.use("/", usersRouter)



app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO} -- MODE:${MODE}`);
})
