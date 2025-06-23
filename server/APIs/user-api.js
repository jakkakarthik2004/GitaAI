// create user api app (mini application)
const exp = require("express");
const nodemailer = require("nodemailer");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/verifyToken");
require("dotenv").config();

async function sendUserDataToDatabase(registeredData){
  await usersCollection.insertOne(registeredData);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let usersCollection;
let temporaryCollection;
// get userCollection App
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersObj");
  temporaryCollection=req.app.get("temporaryObj");
  next();
});

// user registration route
userApp.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    // get user resource from client
    const newUser = req.body;
    console.log("new user",newUser);
    // check for duplicate user based on username
    const dbuser = await usersCollection.findOne({
      emailId: newUser.emailId,
    });
    console.log(dbuser)
    // if user found in db
    if (dbuser !== null) {
      res.send({ message: "User existed" });
    } else {
      // hash the password
      // check password and confirmpassword are same
      console.log(newUser.password," ",newUser.confirmPassword)
      if (newUser.password !== newUser.confirmPassword) {
        console.log("Password and confirm password should be same");
        res.send({ message: "Password and confirm password should be same" });
        return;
      }
      const hashedpassword = await bcryptjs.hash(newUser.password, 8);
      //replace plain password with hashed password
      newUser.password = hashedpassword;
      // generate otp with 4 digits
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      
      const tempData = {
        emailId: newUser.emailId,
        password: newUser.password,
        username: newUser.username,
        otp: otp
      }

      // store otp in temporary collection 
      const tempUser=await temporaryCollection.findOne({emailId: newUser.emailId});
      if(tempUser!==null){
        await temporaryCollection.updateOne({emailId: newUser.emailId},{$set: tempData});
      }
      else
      await temporaryCollection.insertOne(tempData);

      // send email with otp
      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.emailId,
        subject: "OTP for registration",
        text: `Your OTP is ${otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send({message:"User is created"});

      
    }
  })
);

// checking the otp
userApp.post("/check-otp",expressAsyncHandler(async(req,res)=>{
  const otp = req.body.otp;
  const tempData = await temporaryCollection.findOne({otp: otp});
  if(tempData===null){
    res.send({message:"Invalid OTP"})
  }
  else{
    await temporaryCollection.deleteOne({otp: otp});
    const registeredData = {
      username: tempData.username,
      emailId: tempData.emailId,
      password: tempData.password
    }
    sendUserDataToDatabase(registeredData);
    res.send({ message: "User is created" });
  }

}))

userApp.get("/get-tempuser/:emailId",expressAsyncHandler(async(req,res)=>{
  const emailId = req.params.emailId;
  const tempData = await temporaryCollection.findOne({emailId: emailId});
  console.log("tempdata",tempData);
  res.send({payload:tempData});
}))

userApp.put('/resend-otp/:emailId',expressAsyncHandler(async(req,res)=>{
  const emailId = req.params.emailId;
  const tempData = await temporaryCollection.findOne({emailId: emailId});
  const otp = Math.floor(1000 + Math.random() * 9000);
  const mailOptions = {
    from: process.env.EMAIL,
    to: tempData.emailId,
    subject: "OTP for registration",
    text: `Your OTP is ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  await temporaryCollection.updateOne({emailId: tempData.emailId},{$set: {otp: otp}});
  res.send({message:"OTP has been sent"});
}))

// user login route
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get cred object from client
    const userCred = req.body;
    // check for username
    console.log(userCred);
    const dbuser = await usersCollection.findOne({
      emailId: userCred.emailId,
    });
    if (dbuser === null) {
      res.send({ message: "Invalid Email" });
    } else {
      // check for password
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        res.send({ message: "Invalid Password" });
      } else {
        // create jwt token and encode it
        const signedToken = jwt.sign(
          { username: dbuser.username },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        // send res
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  })
);
module.exports = userApp;