const jwt=require("jsonwebtoken")
require("dotenv").config();
function verifyToken(req,res,next){
// get bearer toke from headers of request
const bearerToken=req.headers.authorization;
// if bearer token not available
if(!bearerToken){
    return res.send({message:"Un Authorized request. Please login to continue"})
}
// extract token from bearer token
const token=bearerToken.split(' ')[1];
try{
    jwt.verify(token,process.env.SECRET_KEY);
}catch(err){
    next(err);
}
}


module.exports=verifyToken;