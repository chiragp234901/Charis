import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import aiRouter from "./routes/aiRoute.js";

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(cors({
  origin: [
    "https://bucolic-kitsune-ae4c03.netlify.app",
    "https://chimerical-rabanadas-5c0219.netlify.app",
    "https://thecharisstore.com",
    "https://www.thecharisstore.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

app.options("*", cors());

app.use(express.json());

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/ai',aiRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))