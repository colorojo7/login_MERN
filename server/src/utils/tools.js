import jwt from 'jsonwebtoken' 
import envConfigObjet from '../config/dotenv.config.js'
import bcrypt from 'bcrypt'


export const createToken = async (data) =>{
    return jwt.sign({...data}, envConfigObjet.accessTokenSecret , {expiresIn:'7d'})
 }


export const removePassword=(data)=>{
    const {password, ...rest} = data
    return rest
}

export const createRandomNumber =(digits=6)=> {
    if (digits === NaN) {
        throw new Error("createRandomNumber() only recive numbers");
    }
    
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    return Math.floor(min + Math.random() * (max - min + 1));
}




//crate hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
//export const createHash = async (password) => await  bcrypt.hash(password, 10);   // Asi lo haria midu

// validate hash
export const data_VS_hashData = (data, hashData) => bcrypt.compareSync(data, hashData);