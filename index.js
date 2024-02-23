const express=require('express');
const app=express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors=require('cors');
const db=require('./config/db');
const PORT=3000;
app.use(cors());
app.use(express.json());
const userRoutes=require('./Routes/User');
const productRoutes=require('./Routes/Products');
app.use('/user',userRoutes);
app.use('/products',productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT,()=>{
    console.log('Server is running on the port',PORT)
});