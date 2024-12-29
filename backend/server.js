import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import "./Model/db.js";
import MemberRoutes from "./routes/MemberRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();

const app=express();

const PORT=process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use('/api',MemberRoutes);
app.use('/api',AuthRoutes);


app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})

