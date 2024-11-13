import {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateOrderStatus} from '../controllers/cartController.js'
import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/auth.js';


const orderRouter = express.Router();

orderRouter.post('/place',userAuth, placeOrder)
orderRouter.post('/placeWithStripe',userAuth, placeOrderStripe)
orderRouter.get('/all-order',adminAuth ,allOrders)
orderRouter.get('/user-order',userAuth, userOrders)
orderRouter.post('update-status',adminAuth , UpdateOrderStatus)