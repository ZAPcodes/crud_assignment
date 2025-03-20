import express from "express";
import { createUser, updateUser, deleteUser, getSingleUser, getAllUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/create", createUser);
router.patch("/update/:id", updateUser); 
router.delete("/delete/:id", deleteUser); 
router.get("/get-single-user/:id", getSingleUser);
router.get("/get-all-user", getAllUser); 

export default router;