import { User, validateUser, validatePartialUser } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create user
const createUser = async (req, res) => {
  const data = req.body;
  console.log("data", req.body);

  if (!data) throw new ApiError(404, "No user data received");
  const { error } = validateUser.validate(data);
  if (error) throw new ApiError(400, error.details[0].message);

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new ApiError(409, "User already exists"); // 409 Conflict

  let user;
  try {
    user = new User(data);
    await user.save();
  } catch (error) {
    throw new ApiError(500, "Error saving user");
  }

  const createdUser = await User.findById(user._id);
  if (!createdUser) throw new ApiError(500, "User creation failed");

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User successfully registered")
  );
};

// Update user
const updateUser = async (req, res) => {
  const data = req.body;
  const { error, value } = validatePartialUser.validate(data);

  if (error) {
    return res.status(400).json(new ApiError(400, error.details[0].message));
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!user) {
      return res.status(404).json(new ApiError(404, "No user found"));
    }
    return res.status(200).json(
      new ApiResponse(200, user, "User data successfully updated")
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Delete user (soft delete)
const deleteUser = async (req, res) => {
  try {
    const data = { is_active: false };
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!user) {
      return res.status(404).json(new ApiError(404, "No user found"));
    }
    return res.status(200).json(
      new ApiResponse(200, user, "User deleted successfully")
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json(new ApiError(404, "No user found"));

    res.status(200).json(new ApiResponse(200, user, "User found"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Get all users with pagination and filtering
const getAllUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filter parameters
  const { name, email, roles } = req.query;
  const query = { is_active: true }; // Only active users
  if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
  if (email) query.email = { $regex: email, $options: "i" };
  if (roles) query.roles = roles; // Exact match for roles

  try {
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(skip)
      .limit(limit);

    if (!users.length && page === 1) {
      return res.status(200).json(
        new ApiResponse(200, [], "No users found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, {
        data: users,
        total,
        page,
        pages: Math.ceil(total / limit),
      }, "Users retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { createUser, updateUser, deleteUser, getSingleUser, getAllUser };