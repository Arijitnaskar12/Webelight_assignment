const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    name:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
});
module.exports=mongoose.model('products',productSchema);