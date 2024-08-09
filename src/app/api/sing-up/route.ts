import dbConnect from "@/lip/dbConnection";
import UserModel from "@/model/User";


export async function POST(request:Request) {
  await dbConnect()

  try {
    const {username, email,password}= await request.json()
    const existingUserVerifiedByUserName= await UserModel.findOne({
      username,
      isVerified:true
    })
   if(existingUserVerifiedByUserName){
    return Response.json({
      success:false,
      message:"Username is already taken"
    },{status:400})
   }
  } catch (error) {
    console.log("Error registretion user ");
    
  }
}