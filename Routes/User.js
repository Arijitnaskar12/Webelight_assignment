const express=require('express');
const { loginFunction, registerFunction, customerDetails } = require('../Controllers/verification.controllers');
const { isAuth } = require('../Middlewares/isAuth');
const app=express();

app.post('/register',registerFunction);
app.post('/login',loginFunction);
app.get('/allcustomers',isAuth,customerDetails);
module.exports=app;