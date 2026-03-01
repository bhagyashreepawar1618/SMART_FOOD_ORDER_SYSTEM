import {
  registerStudent,
  loginStudent,
  getTodaysMenu,
  setStudentMenu,
} from "../controllers/students.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
  ]),
  registerStudent
);
router.route("/login").post(loginStudent);
router.route("/getmenu").post(verifyJWT, getTodaysMenu);
router.route("/set-student-menu").post(verifyJWT, setStudentMenu);
export default router;
