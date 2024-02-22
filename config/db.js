const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB is Connected");
})
.catch((e)=>{
console.log(e);
})