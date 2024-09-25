import { Router } from "express";
import { createUser, getUserAddresses } from "../controllers/user.controller.js";

//Express Router Setup
const router = Router();

//Routes 
router.get("/:username", getUserAddresses);
router.post("/create", createUser);

export default router;