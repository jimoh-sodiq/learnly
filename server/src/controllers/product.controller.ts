import Product from "../models/product.model";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import crypto from "crypto";
import { createResponse } from "../utils/response.util";
import * as CustomError from "../errors";
import { RequestWithUser } from "../types/request.type";

export async function createProduct(req: Request, res: Response) {
  req.body.createdBy = (req as RequestWithUser).user.userId;
  const product = await Product.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json(createResponse(true, { product }, "Product created successfully"));
}

export async function getAllProducts(req: Request, res: Response) {
  const { searchTerm } = req.query;
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { name: new RegExp(searchTerm as string, "i") },
        { description: new RegExp(searchTerm as string, "i") },
      ],
    };
  }
  const products = await Product.find(query);
  return res
    .status(StatusCodes.OK)
    .json(
      createResponse(
        true,
        { products, count: products.length },
        "Products fetched successfully"
      )
    );
}

export async function getSingleProduct(req: Request, res: Response) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  return res
    .status(StatusCodes.OK)
    .json(createResponse(true, { product }, "Product fetched successfully"));
}

export async function updateProduct(req: Request, res: Response) {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  return res
    .status(StatusCodes.OK)
    .json(createResponse(true, { product }, "Product updated successfully"));
}

export async function deleteProduct(req: Request, res: Response) {
  const { id: productId } = req.params;
  const product = await Product.findById({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  await product.deleteOne();
  return res
    .status(StatusCodes.OK)
    .json(createResponse(true, null, "Product deleted successfully"));
}
