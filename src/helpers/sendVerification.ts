import { resend } from "@/lip/resen";
import VerificationEmail from "../../emails/EmailTemplate";
import { ApiRespose } from "@/types/ApiRespose";

export async function sendVerification(emails:string,username:string,verifiCode:string):Promise<ApiRespose> {
    try {
      await resend.emails.send({
            from: 'prathameshm@chittlesoft.com',
            to: emails,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({ username,otp:verifiCode }),
          });
      
       
        return  {success:true,message:"verification email Send successfully"}
    } catch (EmailError) {
        console.log("Send email is falied")
        return  {success:false,message:"falied to Send email verification"}
    }
}