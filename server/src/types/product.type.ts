import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  imageURL: string;
  createdBy: Types.ObjectId;
};
