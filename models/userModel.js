import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "any"); // "any" supports all locales
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password:{type:String, required:true},
  cartData: {type:Object, default:{}},
  image: {type:String}
},{minimize:false})

const userModel = mongoose.model("user", userSchema);

export default userModel;