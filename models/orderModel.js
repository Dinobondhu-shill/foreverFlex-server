import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId : {type: String, required:true},
  address: {type:Object, required:true},
  amount: {type:Number, required:true},
  paymentMethod: {type:String, required:true},
  items: {type:Array, required:true},
  status:{type: String, required: true, default:"Order Placed"},
  payment: {type:Boolean, required:true, default: false},
  date:{ type:Number, requred:true }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel ;