import express, { Router } from "express";
import { showCurrentUser } from "../controllers/user.controller";
import { authenticateUser } from "../middleware/authentication.middleware";

const router: Router = express.Router();

router.route("/show").get(authenticateUser, showCurrentUser);

export default router;
