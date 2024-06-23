import bcrypt from 'bcrypt'

//crate hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

// validate password
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
export const data_VS_hashData = (data, hashData) => bcrypt.compareSync(data, hashData);