import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url=process.env.MONGO_URL;

console.log("mongo_url",mongo_url);



mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongodb connected successfully ");

    }).catch(err=>{
        console.log("Mongodb connection error",err)

    })

export default mongoose;
