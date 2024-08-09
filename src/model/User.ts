import mongoose, { Mongoose, Document,Schema } from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
} 

const MessageSchema:Schema<Message>=new Schema({
    content :{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAccptingMessage:boolean;
    message:Message[]
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        match:[/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'please use a valide email address'],
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        min:[5,"Passwor at lest 5 characters "],
        max:[20,"Passwor must be 20 characters "]
    },
    verifyCode:{
        type:String,
        required:[true,'Verify code is required']
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,'Varify Code Expiry  is required'],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAccptingMessage:{
        type:Boolean,
        required:[true,'Message is required'],
    },
    message:{
        type:[MessageSchema],
        required:true,
        min:[5,"Message at lest 5 characters "],
        max:[300,"Message must be 20 characters "]
    }
})

const UserModel= (mongoose.models.User as mongoose.Model<User>||mongoose.model<User>("User",UserSchema))

export default UserModel;