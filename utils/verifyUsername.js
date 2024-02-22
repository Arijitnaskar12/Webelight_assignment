const { TRUE, ERROR, FALSE } = require("../Constant");
const { checkUsername } = require("../Repository/Users.repository");

const verifyUsername=async(username)=>{
    const UserData=await checkUsername(username);
 if(UserData?.data?.length!=0)
 {
    return UserData;
 }else if(UserData.err){
    return UserData;
 }else{
    return UserData;
 }
}
module.exports={verifyUsername};