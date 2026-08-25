import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import userRoutes from "./routes/user.routes.js"

dotenv.config();


const app = express();
app.use(express.json());
const env  = process.env.dbUrl



app.use("/users",userRoutes)

mongoose.connect(env).then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
})



const port = process.env.PORT || 8000;



app.listen(port,(req,res)=>{
    console.log(`Server started on port ${port}`)
})