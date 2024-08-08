import { Request } from "express";
import { TTokenUser } from "./user.type";

export type RequestWithUser = Request & { user: TTokenUser };
