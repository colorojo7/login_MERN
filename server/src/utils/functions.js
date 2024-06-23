import jwt from 'jsonwebtoken' 
import envConfigObjet from '../config/dotenv.config.js'

export const createToken = async (data) =>{
    return jwt.sign({...data}, envConfigObjet.secret_word , {expiresIn:'7d'})
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
