import cors from "cors";
import express, { Express } from "express";
import expressAsyncHandler from "express-async-handler";
import { forEach } from "lodash";
import { logger } from "../logger/logger";
import { createApiError } from "./apiError";
import { router } from "./apiRouter";
import { apiLogger } from "./middleware/apiLogger";
import { HttpMethod } from "./types/httpMethods";
import { HttpStatusCode } from "./types/httpStatusCodes";

function addRouterToExpress(app: Express) {
  forEach(router, (subrouter, route) => {
    forEach(subrouter, (endpoint, method) => {
      app[method as HttpMethod](
        route,
        expressAsyncHandler(async (request, response) => {
          const { bodyTypeGuard, requestHandler } = endpoint;
          const body = request.body;

          if (!bodyTypeGuard(body)) {
            response
              .status(HttpStatusCode.BAD_REQUEST_400)
              .json(
                createApiError(
                  HttpStatusCode.BAD_REQUEST_400,
                  "42d623bb-560e-4fcb-924e-461b72c7c54a",
                  "body failed type validation",
                  body,
                ),
              );
          } else {
            const handlerResult = await requestHandler(body);

            response.status(handlerResult.code).json(handlerResult.responseBody);
          }
        }),
      );
    });
  });
}

export function initApi() {
  logger.info("Initializing Api ...");
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(apiLogger);
  addRouterToExpress(app);

  app.listen(8080);
  logger.info("Initializing Api finished!");
}
