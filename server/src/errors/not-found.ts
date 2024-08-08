import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class NotFoundError extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default NotFoundError;