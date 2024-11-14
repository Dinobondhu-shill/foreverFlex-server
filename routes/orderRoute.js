import {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateOrderStatus} from '../controllers/orderController.js'
import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/auth.js';


const orderRouter = express.Router();

// payment features
orderRouter.post('/place',userAuth, placeOrder)
orderRouter.post('/placeWithStripe',userAuth, placeOrderStripe)

// users features
orderRouter.post('/my-orders',userAuth, userOrders)

// admin features
orderRouter.post('/all-order',adminAuth ,allOrders)
orderRouter.post('update-status',adminAuth , UpdateOrderStatus)

export default orderRouter;