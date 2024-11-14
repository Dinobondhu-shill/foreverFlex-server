import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'



const currency = 'bdt'
const deliveryCharges = 10;

// gateway initialization

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
// verify stripe 
const verifyStripe = async (req, res) =>{
  const {orderId, success, userId} = req.body;

  try {
    if(success ==='true'){
      await orderModel.findByIdAndUpdate(orderId, {payment:true})
      await userModel.findByIdAndUpdate(userId, {cartData:{}});
      res.send({success:true})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.send({success:false})
    }
  } catch (error) {
    console.log(error)
    res.send({success:false, message:error.message})
  }
}

// placing order using Stripe method

const placeOrderStripe = async (req, res) =>{
  try {
    const {userId, items, address, amount} = req.body;
    const {origin} = req.headers

  const orderData = {
    userId,
    items,
    address,
    amount, 
    paymentMethod: "Stripe",
    payment:false,
    date: Date.now()
  }
const newOrder = await orderModel(orderData)
await newOrder.save()

const line_items = items.map((item)=>(
 { price_data:{
    currency:currency,
    product_data:{
      name:item.name
    },
    unit_amount:item.price * 100
  },
  quantity:item.quantity
}
));

line_items.push({
  price_data:{
    currency:currency,
    product_data:{
      name:"Delivery fee"
    },
    unit_amount:deliveryCharges * 100
  },
  quantity:1
})

const session = await stripe.checkout.sessions.create({
  success_url:`${origin}/verify?success=true&oderId=${newOrder._id}`,
   cancel_url:`${origin}/verify?success=false&oderId=${newOrder._id}`,
   line_items,
   mode:"payment"
})
res.send({success:true, session_url:session.url})

} catch (error) {
  console.log(error)
  res.send({success:false, message:error.message})
}
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
const UpdateOrderStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    // Validate request body
    if (!status || !id) {
      return res.status(400).send({ success: false, message: "Status and ID are required" });
    }

    // Update order status in the database
    const updatedOrder = await orderModel.findByIdAndUpdate(id, { status }, { new: true });

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).send({ success: false, message: "Order not found" });
    }

    res.status(200).send({ success: true, message: "Order updated successfully", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Server error", error: error.message });
  }
};


export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, UpdateOrderStatus} ;