import envConfigObject from "../config/dotenv.config.js";

export const res400 = (res, error, message=""  )=>{
    return  res.status(400).json({ ok:false, error: error, message: message!=""? message : error });
} 
export const res500 = (res, error, message=""  )=>{
    return  res.status(400).json({ ok:false, error: error, message: message!=""? message : error });
}     

export const res200 = (res, message, data, cookieData, cookieMaxAge=1000 * 60 * 60 * 24 * 7  )=>{
    if(!cookieToken){
        return  res.status(200).json({ ok:true, message: message, doc:data });
    }
    if(cookieToken){
        res
        .status(200)
        cookie(envConfigObject.cookie_user, cookieData, {
          maxAge: cookieMaxAge,
          httpOnly: true,
        })
        json({ ok:true, message: message, doc:data });
    }
}  