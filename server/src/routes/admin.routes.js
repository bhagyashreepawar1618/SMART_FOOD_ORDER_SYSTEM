import { registerAdmin } from "../controllers/admin.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerAdmin);

export { router };
