import { post } from "axios";
import { isNumber, isObject, isString } from "lodash";
import { beforeAll, describe, expect, test } from "vitest";
import { initApi } from "./api";
import { createEndpoint } from "./apiRouter";
import { HttpMethod } from "./types/httpMethods";
import { HttpStatusCode } from "./types/httpStatusCodes";

describe("Api Construction", () => {
  type TestBody = { test1: string; test2: number };
  function typeGuard(value: unknown): value is TestBody {
    return (
      isObject(value) &&
      "test1" in value &&
      "test2" in value &&
      isString(value.test1) &&
      isNumber(value.test2)
    );
  }

  beforeAll(() => {
    createEndpoint<TestBody, { testRes: string }>(
      "/test",
      HttpMethod.POST,
      typeGuard,
      async (body) => {
        if (body.test1 === "a" && body.test2 === 2) {
          return {
            code: HttpStatusCode.OK_200,
            responseBody: {
              testRes: "a-OK",
            },
          };
        }
      },
    );
    initApi();
  });

  test("The API provides a response on valid route call", async () => {
    const testBody = { test1: "a", test2: 2 };
    const response = await post("http://localhost:8080/test", testBody);

    expect(response.data).toEqual({ testRes: "a-OK" });
  });

  test("The API provides an error when called with faulty body", async () => {
    const testBody = { test1: "a" };

    expect(post("http://localhost:8080/test", testBody)).rejects.toThrow();
  });
});
