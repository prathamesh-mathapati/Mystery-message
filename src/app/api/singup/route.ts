import { sendVerification } from "@/helpers/sendVerification";
import dbConnect from "@/lip/dbConnection";
import UserModel from "@/model/User";
const bcrypt = require('bcrypt');


export async function POST(request:Request) {
  await dbConnect()

  try {
    const {username, email,password}= await request.json()
    const existingUserVerifiedByUserName= await UserModel.findOne({
      username,
      isVerified:true
    })
    const verifyCode = Math.floor(100000+Math.random()*900000).toString()
    const expiryDate= new Date()
    expiryDate.setHours(expiryDate.getHours()+1)
   if(existingUserVerifiedByUserName){
    if(existingUserVerifiedByUserName.isVerified){
      return Response.json({
        success:false,
        message:"Username is already exist with this email"
      },{status:400})
    }
    else{
      const hasedPassWord = await bcrypt.hash(password,10)
      existingUserVerifiedByUserName.password=hasedPassWord;
      existingUserVerifiedByUserName.verifyCode=verifyCode;
      existingUserVerifiedByUserName.verifyCodeExpiry=expiryDate;
      await existingUserVerifiedByUserName.save()
    }
   }else{
    // const hasedPassWord=await bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const nexUser=new UserModel({
      username,
      email,
      password:hashedPassword,
      verifyCode,
      verifyCodeExpiry:verifyCode,
      isVerified:false,
      isAccptingMessage:true,
      message:[]
    })
    await nexUser.save()
    const emailResponse=await sendVerification(
      email,username,verifyCode
    )
    if(!emailResponse.success){
      return Response.json({
        success:false,
        message:emailResponse.message
      },{status:500})

    }

    return Response.json({
      success:true,
      message:"User register successfully. Please verify your email."
    },{status:201})
  }
  } catch (error) {
    console.log("Error registretion user");
    
  }
}