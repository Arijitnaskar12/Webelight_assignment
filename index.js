const express=require('express');
const app=express();
require('dotenv').config();
const db=require('./config/db');
const PORT=process.env.PORT||3000;
app.use(express.json());
const userRoutes=require('./Routes/User');
const productRoutes=require('./Routes/Products');
app.use('/user',userRoutes);
app.use('/products',productRoutes);
app.listen(PORT,()=>{
    console.log('Server is running on the port',PORT)
});