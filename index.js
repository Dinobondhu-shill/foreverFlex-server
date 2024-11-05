import express from "express";
import cors from 'cors';
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinari.js";

// App config 
const app = express();
const port = process.env.PORT || 3000;
connectDB()
connectCloudinary();

// Middleware 
app.use(express.json());
app.use(cors());

// Api endpoints 
app.get('/', (req, res)=>{
  res.send("API Working")
});

app.listen(port, ()=>{
  console.log('server started on port :' + port)
})