import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Admin } from "../models/admin.model.js";
import { Menu } from "../models/menu.model.js";
import { Order } from "../models/order.model.js";
import mongoose from "mongoose";

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

export const setMenuData = asyncHandler(async (req, res) => {
  //take data from user
  const { date, sabjiOptions, sweetOptions } = req.body;

  if (!date || !sabjiOptions || !sweetOptions) {
    throw new ApiError(400, "All fields are required");
  }

  //check if menu is alredy created
  const existedMenu = await Menu.findOne({ date });

  if (existedMenu) {
    existedMenu.sabjiOptions = sabjiOptions;
    existedMenu.sweetOptions = sweetOptions;

    await existedMenu.save();

    return res
      .status(200)
      .json(new ApiResponse(200, existedMenu, "Menu updated successfully"));
  }

  //if menu is not present of that date then create new menu
  const newmenu = await Menu.create({
    date,
    sabjiOptions,
    sweetOptions,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newmenu, "Menu is saved successfully"));
});

export const updateAdminProfile = asyncHandler(async (req, res) => {
  //take updated data from admin
  const { email, fullname } = req.body;

  //validation
  if (!email || !fullname) {
    throw new ApiError(409, "all feilds are required");
  }

  //store or overwrite them in database
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedAdmin, "Admin details updated successfully")
    );
});

export const updatePassword = asyncHandler(async (req, res) => {
  //take old password and new password from admin
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin?._id);

  const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  //if password is correct
  admin.password = newPassword;

  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  let filter = {};

  if (menuId) {
    filter.menu = menuId;
  }

  const orders = await Order.find(filter)
    .populate("student", "fullname email username")
    .populate("menu", "date");

  const totalOrders = orders.length;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalOrders,
        orders,
      },
      "All orders fetched successfully"
    )
  );
});

export const getMenuStats = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  if (!menuId) {
    throw new ApiError(400, "Menu ID is required");
  }

  //  Sabji Votes
  const sabjiStats = await Order.aggregate([
    { $match: { menu: new mongoose.Types.ObjectId(menuId) } },
    {
      $group: {
        _id: "$selectedSabji",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        sabji: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  //Sweet Votes
  const sweetStats = await Order.aggregate([
    { $match: { menu: new mongoose.Types.ObjectId(menuId) } },
    {
      $group: {
        _id: "$selectedSweet",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        sweet: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  // 3️⃣ Total Rotis
  const rotiStats = await Order.aggregate([
    { $match: { menu: new mongoose.Types.ObjectId(menuId) } },
    {
      $group: {
        _id: null,
        totalRotis: { $sum: "$rotis" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        sabjiStats,
        sweetStats,
        totalRotis: rotiStats[0]?.totalRotis || 0,
        totalOrders: rotiStats[0]?.totalOrders || 0,
      },
      "Menu statistics fetched successfully"
    )
  );
});
