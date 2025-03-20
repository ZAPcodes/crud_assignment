import mongoose from "mongoose";
import Joi from "joi"; 

// Mongoose Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true,  
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true, 
    },
    phone: {
      type: Number,
      required: true,
      min: 1000000000, 
      max: 9999999999,
    },
    age: {
      type: Number,
      required: true,
      min: 0, 
    },
    roles: {
      type: String,
      required: true,
      enum: ["user", "admin"], 
    },
    is_active: {
      type: Boolean, 
      default: true,
    },
  },
  { timestamps: true } 
);

// Joi Validation Schema
const validateUser = Joi.object({
  name: Joi.string().min(3).required().trim(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  age: Joi.number().integer().min(0).required(),
  roles: Joi.string().valid("user", "admin").required(), 
  is_active: Joi.boolean().default(true), 
});

const validatePartialUser = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().lowercase(),
  phone: Joi.number().integer().min(1000000000).max(9999999999),
  age: Joi.number().integer().min(0),
  roles: Joi.string().valid("user", "admin"),
  is_active: Joi.boolean(),
}).optional().unknown(true);

// Mongoose Model
const User = mongoose.model("User", userSchema);

export { User, validateUser, validatePartialUser };