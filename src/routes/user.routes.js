import express from "express";
import { createUser, updateUser, deleteUser, getSingleUser, getAllUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/create", createUser);
router.patch("/update/:id", updateUser); // Changed to PATCH for partial updates
router.delete("/delete/:id", deleteUser); // Changed to DELETE for deletion
router.get("/get-single-user/:id", getSingleUser);
router.get("/get-all-user", getAllUser); // Pagination and filtering via query params

export default router;