import { hasNoValue } from "@web-tech/shared/lib/util/typeGuards";
import { logger } from "../logger/logger";
import { HttpMethod } from "./types/httpMethods";
import { HttpStatusCode } from "./types/httpStatusCodes";

export const router: {
  [route: string]: {
    [method in HttpMethod]?: {
      bodyTypeGuard: Parameters<typeof createEndpoint>["2"];
      requestHandler: Parameters<typeof createEndpoint>["3"];
    };
  };
} = {};

export function createEndpoint<RequestBody extends object, ResponseBody extends object>(
  route: `/${string}`,
  method: HttpMethod,
  bodyTypeGuard: (value: unknown) => value is RequestBody,
  requestHandler: (requestBody: RequestBody) => Promise<{
    code: HttpStatusCode;
    responseBody: ResponseBody;
  }>,
) {
  if (hasNoValue(router[route])) {
    router[route] = {};
  }
  router[route][method] = { bodyTypeGuard, requestHandler };
  logger.info(`Registering endpoint at [${route}] with method [${method}]`);
}
