import {
  registerAdmin,
  loginAdmin,
  setMenuData,
  updateAdminProfile,
  updatePassword,
  getAllOrders,
  getMenuStats,
} from "../controllers/admin.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/authAdmin.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/setmenu").post(setMenuData);
router.route("/update-profile").post(verifyJWT, updateAdminProfile);
router.route("/update-password").post(verifyJWT, updatePassword);
router.route("/all-orders").get(verifyJWT, getAllOrders);
router.route("/get-menu-stats/:menuId").get(verifyJWT, getMenuStats);

export default router;
