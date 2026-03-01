import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Admin } from "../models/admin.model.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password, fullname } = req.body;

  //validation
  if (!email || !password || !fullname) {
    throw new ApiError(409, "All feilds are required");
  }

  //check if admin is already registered
  const admin = await Admin.findOne({ email });

  if (admin) {
    throw new ApiError(404, "Admin with this Email is already registerd ");
  }

  //if admin does not exists then craete instance in database
  const admincreated = await Admin.create({
    email,
    password,
    fullname,
  });

  const createdAdmin = await Admin.findById(admincreated._id).select(
    "-password"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin Registered Successfully"));
});
