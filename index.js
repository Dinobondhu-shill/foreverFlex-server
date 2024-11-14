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

let corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://localhost:5173",
      "https://your-frontend-url.vercel.app",
      undefined  // Allow undefined origins (like file:///) in development
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};


app.use(cors(corsOptions));
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
