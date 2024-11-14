import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method

const placeOrder = async (req, res) =>{
  
  try {
    const {userId, items, address, amount} = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount, 
    paymentMethod: "COD",
    payment:false,
    date: Date.now()
  }
const newOrder = await orderModel(orderData)
await newOrder.save()
await userModel.findByIdAndUpdate(userId, {cartData:{}})
res.send({success:true, message: "Order has been placed"})

  } catch (error) {
    console.log(error)
    res.send({success:false, message:error.message})
  }


}

// placing order using Stripe method

const placeOrderStripe = async (req, res) =>{

}

// order data for Admin Panel

const allOrders = async (req, res) =>{
  try {

    const orderData = await orderModel.find({});
    res.send({success:true, orderData})
    
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }

}
// order data for Frontend 

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orderData = await orderModel.find({ userId }).populate('items.productId'); // Assumes items.productId refers to the product model
    res.send({ success: true, orderData });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};

// update order status

const UpdateOrderStatus = async (req, res) =>{

}

export {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateOrderStatus} ;