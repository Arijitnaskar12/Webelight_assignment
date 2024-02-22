const { ERROR, TRUE } = require("../Constant");
const userSchema=require('../Models/User');
let LIMIT=5;
const addToDB=async(userObj)=>{
    try{
        await userObj.save();
        return TRUE;
    }catch(e)
    {
        return ERROR;
    }
}
const checkUsername=async(username)=>{
    let UserData={
        data:null,
        err:null
    }
    try{
         UserData.data=await userSchema.find({username});
        return UserData;
    }catch(error)
    {
        UserData.err= error;
        return UserData; 
    }
}

const fetchCustomer=async(page)=>{
    let UserData={
        data:null,
        err:null
    }
    try{
         UserData.data=await userSchema.find({role:"user"}).skip((page-1)*LIMIT).limit(LIMIT);
        return UserData;
    }catch(error)
    {
        UserData.err= error;
        return UserData; 
    }
}
module.exports={addToDB,checkUsername,fetchCustomer};