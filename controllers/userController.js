import userModel from "../models/userModel.js";
import validator from "validator";
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
 try {

  const {email, password} = req.body;
  const user = await userModel.findOne({email})
  if (!user) {
    return res.send({success:false, message:"User doesn't exist"})
  }
  const isMatch = await bycrypt.compare(password, user.password)

  if (isMatch) {

    const token = createToken(user._id)
    res.send({success:true, token})
  } else {
    res.send({success:false, message:"Incorrect Password"})
  }

 } catch (error) {
  console.log(error),
    res.send({success:false, message:error.message})
 }

}
// Route for user register
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      image
    } = req.body;

    // checking email already exists or not 
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.send({success:false, message:"User is already exist"})
    }

    if (!validator.isEmail(email)) {
      return res.send({success:false, message:"Please Enter a valid Email"})
    }
    if (password.length < 8) {
      return res.send({success:false, message:"Please Enter a Strong Password"})
    }

    // hasing bycrypt password
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password, salt)

    const newUser = new userModel ({
      name, 
      email,
      password:hashedPassword,
      phone, image
    })
    const user = await newUser.save()

    const token = createToken(user._id)

    res.send({success:true, token})

  } catch (error) {
    console.log(error),
    res.send({success:false, message:error.message})
  }
}

// Admin login
const adminLogin = async (req, res) => {
  try {
    
    const {email, password} = req.body;
    

    if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
      const token = await jwt.sign(email+password, process.env.JWT_SECRET)
      res.send({success:true, token})
    } 
    else {
      res.send({success:false, message:"Invalid credentials"})
    }


  } catch (error) {
    res.send({success:false, message:error.message})
  }
}

export {
  loginUser,
  registerUser,
  adminLogin
};