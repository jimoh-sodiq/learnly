import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createResponse,
} from "../utils/response.util";
import { RequestWithUser } from "../types/request.type";


export async function showCurrentUser(req: Request, res: Response) {
  res
    .status(StatusCodes.OK)
    .json(
      createResponse(
        true,
        (req as RequestWithUser).user,
        "user retrieved successfully"
      )
    );
}
