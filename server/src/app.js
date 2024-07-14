//import helmet from "helmet";
//import morgan from "morgan";
//import dotenv from "dotenv";


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from 'cookie-parser'
import passport from "passport";

import initializePassport from './config/passport.config.js'
import { errorHandler } from './middleware/errorHandler.js';
import './data/db.js'


import envConfigObject from './config/dotenv.config.js'
import corsOptions from './config/corsOptions.js';

import usersRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import dashboardRouter from './routes/dashboardRouter.js'


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = envConfigObject.port || 4000; 
const MODE =    envConfigObject.mode; 

//import { logger } from './middleware/logger.js';
//app.use(logger)

/* CONFIGURATION */
//dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

/* CONFIGURATION HELMET & MORGAN to be reserched */
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));

/* ROUTES */


// app.get("/", (req, res)=>{
//     res.send("Server working fine")
// }) 

//app.use(express.static('dist'))

app.use("/", usersRouter)
app.use("/", authRouter)
app.use("/", dashboardRouter)

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} -- MODE:${MODE}`);
})
