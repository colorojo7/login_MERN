import { mongoose } from 'mongoose'
import envConfigObject from '../config/dotenv.config.js'

mongoose.connect(envConfigObject.mongo_url)
.then(()=>console.log("connected to mongoDB"))
.catch((e)=>console.log("mongoDB Error", e))


