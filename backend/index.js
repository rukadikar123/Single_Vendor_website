import express from 'express'
import dotenv from 'dotenv'
import { mongoDbConnect } from './config/mongodbConnection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authrouter from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import ordersRoutes from './routes/orders.routes.js'
import cartRoutes from './routes/cart.routes.js'

const app=express()

dotenv.config()

// middlewares
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser())


app.use('/api/auth', authrouter)
app.use('/api/products',productRoutes )
app.use('/api/orders', ordersRoutes)
app.use("/api/cart", cartRoutes);

mongoDbConnect()

const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server is started on port ${port}`);
    
})