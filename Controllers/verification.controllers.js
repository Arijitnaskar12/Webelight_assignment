const bcrypt=require('bcrypt');
const BCRYPT_SALTS=Number(process.env.BCRYPT_SALTS);
const joi=require('joi');
const { addToDB, fetchCustomer } = require('../Repository/Users.repository');
const { ERROR, TRUE } = require('../Constant');
const User=require('../Models/User');
const { verifyUsername } = require('../utils/verifyUsername');
const jwt=require('jsonwebtoken');
const registerFunction=async(req,res)=>{
    const{username,password,role}=req.body;
    const isValid=joi.object().keys({
        username:joi.string().min(6).max(15).alphanum().required(),
        password:joi.string().min(8).max(15).required(),
        role:joi.string().required(),
    }).validate(req.body);
    if(isValid.error)
    {
        return res.status(422).send({
            status:422,
            message:isValid.error?.details[0]?.message
                })
    }
    const isUserExisting=await verifyUsername(username);
    if(isUserExisting?.data?.length!=0)
 {
    return res.status(400).send({
        status:400,
        message:"Username is already exists."
    });
 }else if(isUserExisting === ERROR)
 {
    return res.status(400).send({
        status:400,
        message:"Err: verifyEmailandUsername failed!"
    });  
 }else{
    const hashPassword=await bcrypt.hash(password,BCRYPT_SALTS);
    const userObj=new User({
        username,
        password:hashPassword,
        role
    });
    const response=await addToDB(userObj);
    if(response===ERROR)
{
  return  res.status(400).send({
      status:400,
      message:"DB err:Failed to add new User!"
   })
}else if(response===TRUE){

return res.status(201).send({
   status:201,
   message:"User added successfully!"
})
}
 }
};
const loginFunction=async(req,res)=>{
    const {username,password}=req.body;
    const isValid=joi.object().keys({
        username:joi.string().min(6).max(15).alphanum().required(),
        password:joi.string().min(8).max(15).required(),
    }).validate(req.body);
    if(isValid.error)
    {
        return res.status(422).send({
            status:422,
            message:isValid.error?.details[0]?.message
                })
    }
   let userData=await verifyUsername(username);
      if(userData.err)
      {
        return  res.status(400).send({
            status:400,
            message:"DB Error: getUserDataFromEmail failed!"
         })
      }
   
   if(!userData.data){
      return res.status(400).send({
         status:400,
         message:"User not found!Please register"
      })
   }
   const isPasswordMatching=await bcrypt.compare(password,userData.data[0].password);
   if(!isPasswordMatching)
   {
       return res.status(400).send({
         status:400,
         message:"Password not matched.Please enter the correct password!"
      })
   }
   const payload={
    username:userData.data[0].username,
    role:userData.data[0].role
}
const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'2h'});
return res.status(200).send({
    status:200,
    message:`Login Successfully as a ${userData.data[0].role}`,
    data:{"token":token}
});
}
const customerDetails=async(req,res)=>{
const userDetails=req.locals;
if(userDetails.role!='admin')
{
    return res.status(401).send({
        status:401,
        messgae:"You are not allowed to access the data."
    })
}
const page=req.query.page||1;
const customers=await fetchCustomer(page);
if(customers.data.length==0)
{
    return res.status(400).send({
        status:400,
        message:"No customer Found",
    })
}else if(customers.err){
    return res.status(400).send({
        status:400,
        message:"Error in Customer Founding",
    })
}else{
    return res.status(200).send({
        status:200,
        message:"Customers Fetched Succesfully",
        data:customers.data
    })
}
}
module.exports={loginFunction,registerFunction,customerDetails};