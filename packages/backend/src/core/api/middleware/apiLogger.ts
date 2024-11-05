import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger/logger";

export const apiLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info(`Received request for [${request.path}] with method [${request.method}]`);
  next();
};
