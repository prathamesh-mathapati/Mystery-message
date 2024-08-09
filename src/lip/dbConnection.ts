import mongoose from "mongoose";

type ConnetionObject={
    isConnection?:number
}

const connection:ConnetionObject={}

async function dbConnect ():Promise<void>{
    if(connection.isConnection){
        console.log("Already connected to database")
        return
    }
    try{
        const db=await mongoose.connect(process.env.MONGOODB_URL||"")
        connection.isConnection=db.connections[0].readyState
        console.log("DB connected ")

    }
    catch(error){
        console.log("DB is not connected ")
        process.exit(1)

    }
}

export default dbConnect