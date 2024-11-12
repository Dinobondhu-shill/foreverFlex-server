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

const image1 = req.files.image1 ? req.files.image1[0] : null;
const image2 = req.files.image2 ? req.files.image2[0] : null;
const image3 = req.files.image3 ? req.files.image3[0] : null;
const image4 = req.files.image4 ? req.files.image4[0] : null;
const images = [image1, image2, image3, image4].filter(Boolean);;

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

    let parsedSizes;
    try {
      parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
    } catch (err) {
      console.error("Failed to parse sizes:", err);
      parsedSizes = []; // or handle the error as appropriate
    }
    // Construct the product data
    const productData = {
      name,
      price: Number(price),
      category,
      subCategory,
      description,
      bestSeller: bestSeller === "true", // Convert string to boolean
      sizes: parsedSizes, 
      imagesUrl,
      date: Date.now(), // Fix date property
    };
    
    console.log("Final productData:", productData);
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
    const deletedProduct = await productModel.findByIdAndDelete(req.body.id);
    if (deletedProduct) {
      res.send({ success: true, message: "Your product has been deleted" });
    } else {
      res.send({ success: false, message: "Product not found" });
    }
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