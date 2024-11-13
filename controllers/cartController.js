
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

    if (cartData[itemId]) {
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
   try {
    const {userId, itemId, size, quantity} = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, {
      cartData
    })
    res.send({
      success: true,
      message: "Cart Updated"
    })
   } catch (error) {
    console.log(error)
    res.send({success:false, message:error.message})
  }
}



const getCartData = async (req, res) => {

  try {
    const {userId } = req.body;
    const userData = await userModel.findById(userId);
    console.log(userData)
    let cartData = await userData.cartData;
  res.send({success:true, cartData})
  } catch (error) {
    console.log(error)
    res.send({success:false, message:error.message})
  }


}

export {
  addToCart,
  updateCart,
  getCartData
}