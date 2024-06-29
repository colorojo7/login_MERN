import mongoose from "mongoose";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // last_name:{
  //   type: String,
  //   required: true
  // },
  DOB: {
    type: Date,
    required: true,
  },
  // role:{
  //   type: String,
  //   required: true,
  //   default: "worker"
  // },
  // adress:{
  //   type: Object,
  //   reqired: true
  // },
});

//** STATIC METHODS **//

//-->  Register
userSchema.statics.register = async function (email, password, name, DOB) {
  //* VALIDATIONS *//

  // required data are not empty values
  if (!email || !password || !name || !DOB) {
    return { error: "All fields are required" };
  }

  //email has an email format
  if (!validator.isEmail(email)) {
    return { error: "Email is not valid" };
  }

  //email is not in the data base
  const exist = await this.findOne({ email });
  if (exist) {
    return { error: "Email already in use" };
  }

  //password is strong enough
  const minStrenght = 35;

  const strenghtValidatorOptions = {
    returnScore: true,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  };
  const passwordStrenght = validator.isStrongPassword(
    password,
    strenghtValidatorOptions
  );
  if (passwordStrenght < minStrenght) {
    return {
      error: `Password not strong enough. Strenght ${passwordStrenght}/${minStrenght}. Try lowercase, uppercase, number and simbols`,
    };
  }

  //* HASH PASSWORD  *//
  const hash = createHash(password);
  //* CREATE USER*//
  const user = await this.create({ password: hash, email, name, DOB });
  return user;
};

//-->  Login
userSchema.statics.login = async function (email, password) {
  //* VALIDATIONS *//
  // required data are not empty vlues
  if (!email || !password) {
    return { error: "All fields are required" };
  }

  //email has an email format
  if (!validator.isEmail(email)) {
    return { error: "Email is not valid" };
  }

  //Veryfy if the email exist in the database
  const user = await this.findOne({ email });
  if (!user) {
    return { error: "The e-mail is not in our database" };
  }

  if (!isValidPassword(password, user)) {
    return { error: "Incorrect password" };
  }

  return user;
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
