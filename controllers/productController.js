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
      sizes,
      bestSeller,
      description,
    } = req.body;

    // Extract images, ensuring they're in the correct format
    const image1 = req.body.image1 && req.body.image1[0];
    const image2 = req.body.image2 && req.body.image2[0];
    const image3 = req.body.image3 && req.body.image3[0];
    const image4 = req.body.image4 && req.body.image4[0];
    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to Cloudinary
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        if (!image.path) {
          throw new Error("Image path is missing.");
        }
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image", // Ensure correct type
        });
        return result.secure_url;
      })
    );

    // Construct the product data
    const productData = {
      name,
      price: Number(price),
      category,
      subCategory,
      description,
      bestSeller: bestSeller === "true", // Convert string to boolean
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes), // Ensure sizes is an array
      imagesUrl,
      date: Date.now(), // Fix date property
    };

    // Save the product to the database
    const product = new productModel(productData);
    await product.save();

    res.send({ success: true, message: "Product has been added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

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
  try {
    
    const {productId} = req.body;
    const product = await productModel.findById(productId)

    res.send({success:true, product})
  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: error.message
    })
  }
}


export {
  addProduct,
  deleteProduct,
  listProduct,
  singleProduct
}