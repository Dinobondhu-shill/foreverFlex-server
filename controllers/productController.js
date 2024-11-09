import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product 
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      subCategory,
      size,
      bestSeller,
      description
    } = req.body;
    const image1 = req.body.image1 && req.body.image1[0]
    const image2 = req.body.image2 && req.body.image2[0]
    const image3 = req.body.image3 && req.body.image3[0]
    const image4 = req.body.image4 && req.body.image4[0]
    const images = [image1, image2, image3, image4]

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: image
        });
        return result.secure_url
      })
    )

    const productData = {
      name,
      price: Number(price),
      category,
      subCategory,
      description,
      bestSeller: bestSeller ==="true" ? true : false,
      size: JSON.parse(size),
      imagesUrl,
      date: date.now()
    }

    const product = new productModel(productData)
    await product.save()

res.send({success:true, message:"Product has been added successfully"})

  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: error.message
    })
  }


}

const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
  res.send({success:true, message:"Your product has been deleted"})
  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: error.message
    })
  }
}

const listProduct = async (req, res) => {

  try {
    const products = await productModel.find({});
    res.send({success:true, products})
  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: error.message
    })
    
  }

}

const singleProduct = async (req, res) => {

}


export {
  addProduct,
  deleteProduct,
  listProduct,
  singleProduct
}