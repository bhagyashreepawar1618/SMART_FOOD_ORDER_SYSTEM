import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Admin } from "../models/admin.model.js";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.accessToken = accessToken;
    admin.refreshToken = refreshToken;

    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (e) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh Tokens"
    );
  }
};
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

export const loginAdmin = asyncHandler(async (req, res) => {
  //take data from frontend user
  const { email, password } = req.body;

  //validation
  if (!email) {
    throw new ApiError(404, "email is required");
  }

  //if present check if admin is registered or not
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new ApiError(409, "Admin with this Email id is not registered");
  }

  //if registered then compare the password if it is correct or not
  const isPassValid = await admin.isPasswordCorrect(password);

  //if password is not valid throw an error
  if (!isPassValid) {
    throw new ApiError(404, "Password is not correct");
  }

  //if password is correct then generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );
  console.log("acc token", accessToken);
  console.log("refresh token=", refreshToken);

  const loggedInAdmin = await Admin.findById(admin._id).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        loggedInAdmin,
        accessToken,
        refreshToken,
      },
      "Admin Logged In successfully"
    )
  );
});
