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

export const createRandomNumber =(digits)=> {
    if (digits < 1) {
        throw new Error("La cantidad de dígitos debe ser al menos 1");
    }
    
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    return Math.floor(min + Math.random() * (max - min + 1));
}




//crate hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

// validate password
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
export const data_VS_hashData = (data, hashData) => bcrypt.compareSync(data, hashData);