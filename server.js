import express from "express";
import dotenv from "dotenv";

import connectDB from "./utils/connectDB.js";
import userRoutes from "./routes/user.route.js";

//Dotenv configuration to access environment variables
dotenv.config();

//Setup an express application
const app = express();

//Port on which express application runs
const PORT = process.env.PORT || 8000;

app.use(express.json()); //Middleware to parse incoming requests with JSON payloads

app.use("/api/user", userRoutes);

//Listen at the given port
app.listen(PORT, (req,res) => {
    console.log(`App is running at ${PORT}`);
    connectDB();
})