import { Types } from "mongoose";

export type TUser = {
  username: string;
  email: string;
  password: string;
};

export type TTokenUser = {
  name: string;
  userId: Types.ObjectId;
};
