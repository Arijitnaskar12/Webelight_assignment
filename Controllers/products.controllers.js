const { allProducts, addProducts, productChecking, updateDetails, Productremove, searchInDB } = require("../Repository/Products.repository");
const Products=require('../Models/Products');
const { ERROR, TRUE } = require("../Constant");
const productFetching=async(req,res)=>{
    const page=req.query.page;
    const fetchData=await allProducts(page);
    if(fetchData.data.length==0)
    {
        return res.status(400).send({
            status:400,
            message:"No Products Found",
        })
    }else if(fetchData.err){
        return res.status(400).send({
            status:400,
            message:"Error in Products Founding",
        })
    }else{
        return res.status(200).send({
            status:200,
            message:"Product Fetched Succesfully",
            data:fetchData.data
        })
    }
}
const addingProduct=async(req,res)=>{
    const userDetails=req.locals;
if(userDetails.role!='admin')
{
    return res.status(401).send({
        status:401,
        messgae:"You are not allowed to Add data."
    })
}
    const{name,category,price}=req.body;
    const productObj=new Products({
        name,
        category,
        price
    });
    const response=await addProducts(productObj);
    if(response===ERROR)
    {
      return  res.status(400).send({
          status:400,
          message:"DB err:Failed to add new Product!"
       })
    }else if(response===TRUE){
    
    return res.status(201).send({
       status:201,
       message:"Product added successfully!"
    })
    }
}
const updateProduct=async(req,res)=>{
    const userDetails=req.locals;
if(userDetails.role!='admin')
{
    return res.status(401).send({
        status:401,
        messgae:"You are not allowed to Add data."
    })
}
    const {_id,name,category,price}=req.body;
    const productPresentOrNot=await productChecking(_id);
    if(productPresentOrNot.data===null)
    {
        return res.status(400).send({
            status:400,
            message:"Product Doesn't Exist"
        })
    }else if(productPresentOrNot.error)
    {
        return res.status(400).send({
            status:400,
            message:"Error in Fetching"
        }) 
    }else{
        const updatedproductObj={
            name,
            category,
            price
        }
        const response=await updateDetails(_id,updatedproductObj);
        if(response==ERROR)
        {
            return res.status(400).send({
                status:400,
                message:"Error in Updating Products"
            })
        }else{
            return res.status(201).send({
                status:201,
                message:"Product Updated Succesfully"
            })
        }
    }
}
const deleteProduct=async(req,res)=>{
    const userDetails=req.locals;
    if(userDetails.role!="admin"){
        return res.status(400).send({
            status:400,
            message:"You are not allowed to delete Product!"
        });
    }
    const id=req.params.id;
    const response=await Productremove(id);
    if(response==ERROR)
        {
            return res.status(400).send({
                status:400,
                message:"Error in Deleteing Product!"
            })
        }else{
            return res.status(200).send({
                status:200,
                message:"Product Deleted Successfully"
            });
        }
}
const filteration=async(req,res)=>{
    const queryParams=req.query;
    let query={};
    let page;
    if(queryParams.category)
    {
        query.category=queryParams.category;
    }
    if(queryParams.minprice||queryParams.maxprice)
    {
         query.price={};
         if(queryParams.minprice)
         {
            query.price.$gte=parseInt(queryParams.minprice);
         }
         if(queryParams.maxprice)
         {
            query.price.$lte=parseInt(queryParams.maxprice);
         }
    }
    if(queryParams.name)
    {
        query.name=queryParams.name;
    }
    if(queryParams.page)
    {
        page=queryParams.page;
    }
    const response=await searchInDB(query,page);
    if(response.error)
    {
        return res.status(400).send({
            status:400,
            message:"Error in fetching the data!"
        });
    }else if(response.data.length==0)
    {
        return res.status(400).send({
            status:400,
            message:"No Products Found against given category!"
        });
    }else{
        return res.status(200).send({
            status:200,
            message:"Product Fetched Successfully",
            data:response.data
        })
    }
}
module.exports={productFetching,addingProduct,updateProduct,deleteProduct,filteration};