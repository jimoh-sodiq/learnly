import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/user.model";
import Token from "../models/token.model";
import {
  createResponse,
  attachCookiesToResponse,
} from "../utils/response.util";
import { createTokenUser, createHashedString } from "../utils/token.util";
import * as CustomError from "../errors";
import { RequestWithUser } from "../types/request.type";

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createResponse(false, null, "Email already exists"));
  }

  const user = await User.create({ username, email, password });
  res
    .status(StatusCodes.CREATED)
    .json(
      createResponse(
        true,
        null,
        "Success! You have been registered, proceed to login"
      )
    );
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError(`No user with email ${email} found`);
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    throw new CustomError.BadRequestError(
      "Your Email or Password is incorrect"
    );
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, { user: tokenUser }, "logged in successfully")
      );
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  await Token.create({
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  });

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res
    .status(StatusCodes.OK)
    .json(createResponse(true, { user: tokenUser }, "logged in successfully"));
}

export async function logout(req: Request, res: Response) {
  await Token.findOneAndDelete({ user: (req as RequestWithUser).user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res
    .status(StatusCodes.OK)
    .json(createResponse(true, null, "Logged out successfully"));
}
