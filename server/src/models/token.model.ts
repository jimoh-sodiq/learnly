import mongoose from "mongoose";
import type { TToken } from "../types/token.type";
import globalConfig from "../core/config";

const TokenSchema = new mongoose.Schema<TToken>(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Token = mongoose.model<TToken>("Token", TokenSchema);

export default Token;
