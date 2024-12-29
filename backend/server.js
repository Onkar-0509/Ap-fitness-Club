import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import "./Model/db.js";
import MemberRoutes from "./routes/MemberRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();

const app=express();

const PORT=process.env.PORT || 3000;


app.use(cors(
    // origin: "http://192.168.216.188:5173/", // Replace with your frontend IP and port
));
app.use(express.json());

app.use('/api',MemberRoutes);
app.use('/api',AuthRoutes);


app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})

