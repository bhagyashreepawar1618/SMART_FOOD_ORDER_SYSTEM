import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Student } from "../models/Student.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Menu } from "../models/menu.model.js";
import { Order } from "../models/order.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const student = await Student.findById(userId);

    const accessToken = student.generateAccessToken();
    const refreshToken = student.generateRefreshToken();

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

  console.log("successfull...!!");
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
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(404, "username  is required");
  }
  const student = await Student.findOne({ username });

  console.log("student=", student);
  if (!student) {
    throw new ApiError(400, "Student is not Registered");
  }

  //if exists check the password
  //but password in data base is hashed so we need bcrypt to compare
  const isPassCorrect = await student.isPasswordCorrect(password);

  console.log("ispass correct=", isPassCorrect);
  if (!isPassCorrect) {
    throw new ApiError(400, "Password is Incorrect");
  }

  //if password is correct generate access and refresh Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    student._id
  );

  console.log("access token form controller=", accessToken);

  const loggedInStudent = await Student.findById(student._id).select(
    "-password -refreshToken"
  );

  console.log("looged in successfulyy");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { loggedInStudent, accessToken, refreshToken },
        "student logged in successFully"
      )
    );
});

export const getTodaysMenu = asyncHandler(async (req, res) => {
  const { date } = req.body;
  const menu = await Menu.findOne({ date });

  if (!menu) {
    throw new ApiError(400, "Menu for this date is not present");
  }

  //if menu is there then return data
  return res
    .status(200)
    .json(new ApiResponse(200, menu, "Menu data fetched successfully"));
});

export const setStudentMenu = asyncHandler(async (req, res) => {
  const todayDate = new Date().toLocaleDateString("en-CA");
  console.log("today date=", todayDate);
  const todayMenu = await Menu.findOne({ date: todayDate });

  if (!todayMenu) {
    throw new ApiError(404, "Today's menu not found. Please contact admin.");
  }

  const { selectedSabji, selectedSweet, rotis } = req.body;

  if (!selectedSabji || !selectedSweet || !rotis || !todayMenu._id) {
    throw new ApiError(400, "All fields are compulsory");
  }

  const studentId = req.student._id;

  const order = await Order.findOneAndUpdate(
    { student: studentId, menu: todayMenu._id }, // condition
    {
      selectedSabji,
      selectedSweet,
      rotis,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Student menu saved successfully"));
});
