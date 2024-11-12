import express from 'express'
import { addToCart, getCartData, updateCart } from '../controllers/cartController.js'
import userAuth from '../middleware/auth.js';


const cartsRoute = express.Router()

cartsRoute.post('/add-cart',userAuth, addToCart);
cartsRoute.post('/update-cart',userAuth, updateCart);
cartsRoute.get('/cart-data',userAuth, getCartData)


export default cartsRoute;