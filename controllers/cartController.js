
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {

  const {
    userId,
    itemId,
    size
  } = req.body;
  try {
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartdata[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData
    })
    res.send({
      success: true,
      message: "Added To Cart"
    })
  } catch (error) {
    console.log(error)
    res.send({success:false, message:error.message})
  }

}



const updateCart = async (req, res) => {

}



const getCartData = async (req, res) => {

}

export {
  addToCart,
  updateCart,
  getCartData
}