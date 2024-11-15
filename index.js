import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinari.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartsRoute from "./routes/cartRout.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

// App config 
const app = express();
connectDB();
connectCloudinary();

// Middleware 



app.use(cors());
app.use(express.json());

// API endpoints 
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartsRoute);
app.use('/api/order', orderRouter);
app.get('/', (req, res) => {
  res.send("API Working");
});

export default app;
