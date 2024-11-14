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
app.use(express.json());
let corsOptions = {
  origin: (origin, callback) => {
    // If the origin is undefined (e.g., server-to-server calls) or included in allowed list
    const allowedOrigins = [
      "http://localhost:3000",
      "https://localhost:5173",
      "https://your-frontend-url.vercel.app",
      /\.vercel\.app$/,  // Allows subdomains on vercel.app
    ];
    if (!origin || allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}

// API endpoints 
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartsRoute);
app.use('/api/order', orderRouter);
app.get('/', (req, res) => {
  res.send("API Working");
});

export default app;
