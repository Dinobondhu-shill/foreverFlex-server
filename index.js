import express from "express";
import cors from 'cors';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinari.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartsRoute from "./routes/cartRout.js";
import orderRouter from "./routes/orderRoute.js";
require("dotenv").config();

// App config 
const app = express();
const port = process.env.PORT || 3000;
connectDB()
connectCloudinary();

// Middleware 
app.use(express.json());
let corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:5173"]
};

app.use(cors(corsOptions));

// Api endpoints 
app.use('/api/user', userRouter)
app.use('/api/product', productRoute)
app.use('/api/cart', cartsRoute)
app.use('/api/order', orderRouter)
app.get('/', (req, res)=>{
  res.send("API Working")
});

app.listen(port, ()=>{
  console.log('server started on port :' + port)
})

module.exports = app;