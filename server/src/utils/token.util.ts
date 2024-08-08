import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import type { TUser, TTokenUser } from "../types/user.type";
import globalConfig from "../core/config";

export function createTokenUser(user: HydratedDocument<TUser>): TTokenUser {
  return { name: user.username, userId: user._id };
}

export function createJWT(payload : any) {
  const token = jwt.sign(payload, globalConfig.auth.jwtSecret as string);
  return token;
}

export function isTokenValid(token: string) {
  return jwt.verify(token, globalConfig.auth.jwtSecret as string);
}


export function createHashedString(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}