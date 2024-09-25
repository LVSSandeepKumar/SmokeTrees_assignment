import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

//Express Router Setup
const router = Router();

//Routes 
router.post("/create", createUser);

export default router;