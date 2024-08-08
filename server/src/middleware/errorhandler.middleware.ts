import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../utils/response.util";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // set default error
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again",
  };

  // Handle MongoDB validation errors
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  // Handle MongoDB CastError (invalid ObjectId)
  if (err.name == "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 400;
  }

  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field`;
    customError.statusCode = 400;
  }

  // Handle other MongoDB errors
  if (err.name === "MongoError") {
    return res.status(500).json({ error: "MongoDB error" });
  }

  const responseObject = createResponse(false, null, customError.msg);

  return res.status(customError.statusCode).json(responseObject);
};

export default errorHandlerMiddleware;
