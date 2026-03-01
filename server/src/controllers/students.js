import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Student } from "../models/Student.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const student = Student.findById(userId);

    const accessToken = userId.generateAccessToken();
    const refreshToken = userId.generateRefreshToken();

    student.accessToken = accessToken;
    student.refreshToken = refreshToken;

    await student.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (e) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh Tokens"
    );
  }
};
export const registerStudent = asyncHandler(async (req, res) => {
  const { fullname, password, email, username } = req.body;

  console.log("fullname", fullname);
  //validation
  if (!fullname || !username || !password || !email) {
    throw new ApiError(400, "All Fields are compulsory");
  }

  const existedStudent = await Student.findOne({
    $or: [{ username }, { email }],
  });

  if (existedStudent) {
    throw new ApiError(409, "User already Exists");
  }

  const profileLocalPath = req.files?.profilePicture?.[0]?.path;

  if (!profileLocalPath) {
    throw new ApiError(400, "Profile Picture is Required");
  }

  //after getting local path upload it on cloudinary
  const profilePicture = await uploadOnCloudinary(profileLocalPath);

  if (!profilePicture) {
    throw new ApiError(400, "Profile Picture is Required");
  }

  const student = await Student.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
    profilePicture: profilePicture?.url,
  });

  //check if Student got cretaed or not
  const createdStudent = await Student.findById(student._id).select(
    "-password -refreshToken"
  );

  if (!createdStudent) {
    throw new ApiError(500, "something went wrong while registering Student");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdStudent, "Student registered successfully")
    );
});

export const loginStudent = asyncHandler(async (req, res) => {
  //take input from user(username and password or email or password)
  //check if user is registered or not
  //if registered then check if password is correct or not
  //if password is correct generate access and refresh tokens
  //send response
  const { username, email, password } = req.body;

  if (!username || !email) {
    throw new ApiError(404, "username or eamil is required");
  }
  const student = Student.findOne({
    $or: [{ username }, { email }],
  }).select("-password");

  if (!student) {
    throw new ApiError(400, "Student is not Registered");
  }

  //if exists check the password
  //but password in data base is hashed so we need bcrypt to compare
  const isPassCorrect = await student.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(400, "Password is Incorrect");
  }

  //if password is correct generate access and refresh Tokens
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    student._id
  );

  console.log("access token is= ", accessToken);

  const loggedInStudent = Student.findById(student._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, loggedInStudent, "student logged in successFully")
    );
});
