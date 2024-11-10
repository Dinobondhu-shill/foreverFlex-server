import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type:String, required:true},
  description: {type:String, required:true},
  price: {type:Number, required:true},
  category: {type:String, required:true},
  subCategory: {type:String, required:true},
  sizes: { type: [String], default: [] },
  imagesUrl: { type: [String], default: [] },
  bestSeller: {type:Boolean},
  date:{type:Number, required:true}

})

const productModel = mongoose.model("product", productSchema);

export default productModel;