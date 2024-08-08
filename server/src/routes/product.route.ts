import express, { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import { authenticateUser } from "../middleware/authentication.middleware";

const router: Router = express.Router();

router.route("/").get(getAllProducts).post(authenticateUser, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, updateProduct)
  .delete(authenticateUser, deleteProduct);

export default router;
