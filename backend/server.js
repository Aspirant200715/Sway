import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";

dotenv.config();

const app = express();

const env  = process.env.dbUrl
app.use(express.json());



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