import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { isTokenValid } from "../utils/token.util";
import * as CustomError from "../errors";
import { TTokenUser } from "../types/user.type";
import { RequestWithUser } from "../types/request.type";
import Token from "../models/token.model";
import { attachCookiesToResponse } from "../utils/response.util";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken) as { user: TTokenUser };
      (req as RequestWithUser).user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken) as {user: TTokenUser} & {
      refreshToken: string;
    };
    console.log(payload);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    console.log(existingToken);
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    (req as RequestWithUser).user = payload.user
    next();
  } catch (err) {
    console.log("Error -----", err)
    throw new CustomError.UnauthenticatedError("You are not logged in");
  }
}