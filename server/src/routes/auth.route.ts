import express, { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/authentication.middleware";

const router: Router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(authenticateUser, logout);

export default router;
