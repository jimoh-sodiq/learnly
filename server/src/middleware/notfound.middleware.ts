import type { Request, Response } from "express";
import { createResponse } from "../utils/response.util";

const notFoundMiddleware = (req: Request, res: Response) => {
  const responseObject = createResponse(false, null, "Route does not exist");
  res.status(404).send(responseObject.message);
};

export default notFoundMiddleware;
