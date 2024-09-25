import express from "express";
import dotenv from "dotenv";

import connectDB from "./utils/connectDB.js";

//Dotenv configuration to access environment variables
dotenv.config();

//Setup an express application
const app = express();

//Port on which express application runs
const PORT = process.env.PORT || 8000;

//Listen at the given port
app.listen(PORT, (req,res) => {
    console.log(`App is running at ${PORT}`);
    connectDB();
})