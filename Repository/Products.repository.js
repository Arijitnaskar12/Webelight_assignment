const { query } = require('express');
const { TRUE, ERROR } = require('../Constant');
const productSchema=require('../Models/Products');
const LIMIT=5;
const allProducts=async(page)=>{
    let ProductData={
        data:null,
        err:null
    }
    try{
         ProductData.data=await productSchema.find({}).skip((page-1)*LIMIT).limit(LIMIT);
        return ProductData;
    }catch(error)
    {
        ProductData.err= error;
        return ProductData; 
    }
}
const addProducts=async(productObj)=>{
    try{
        await productObj.save();
        return TRUE;
    }catch(e)
    {
        return ERROR;
    }
}
const productChecking=async(_id)=>{
let ProductData={
    data:[],
    error:null
}
try{
    ProductData.data=await productSchema.findOne({_id});
    return ProductData;
}catch(e){
    ProductData.error=e;
    return ProductData;
}
}
const updateDetails=async(_id,updatedproductObj)=>{
    try{
        await productSchema.findByIdAndUpdate({_id},updatedproductObj);
        return TRUE;
    }catch(e){
        return ERROR;
    }
}
const Productremove=async(id)=>{
    try{
        await productSchema.findByIdAndDelete({_id:id});
        return TRUE;
    }catch(e){
        return ERROR;
    }
}
const searchInDB=async(query,page)=>{
let ProductData={
    data:[],
    error:null
}
try{
ProductData.data=await productSchema.find(query).skip((page-1)*LIMIT).limit(LIMIT);
return ProductData;
}catch(e)
{
    ProductData.error=e;
return ProductData;
}
}
module.exports={allProducts,addProducts,productChecking,updateDetails,Productremove,searchInDB};