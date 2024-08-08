import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import type { TUser } from "../types/user.type";
import globalConfig from "../core/config";

interface IUserMethods {
  comparePassword(incomingPassword: string): Promise<boolean>;
}

type UserModel = mongoose.Model<TUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<TUser>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: () => validator.isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value: string) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least 8 characters, including one uppercase letter and one lowercase letter",
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (): Promise<void> {
  if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  incomingPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};

const User = mongoose.model<TUser, UserModel>("User", UserSchema);

export default User;
