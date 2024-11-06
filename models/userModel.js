import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  phone:{type:Number, required:true, unique:true},
  password:{type:String, required:true},
  cartData: {type:Object, default:{}},
  image: {type:String}
},{minimize:false})

const userModel = mongoose.model("user", userSchema);

export default userModel;