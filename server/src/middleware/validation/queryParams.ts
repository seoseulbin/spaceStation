import { RequestHandler } from "express";
import { CustomError } from "../errorHandler.js";

/**
 * 쿼리 파라미터 검증 미들웨어 함수.
 * [사용 예시]
 * sampleRouter.get(
 *   "/",
 *   validateQueryParams([
 *      { key: "limit", isNumber: true },
 *      { key: "userId", isOptional: true },
 *   ]),
 *   sampleController.getSamples,
 * );
 */
export const validateQueryParams =
  (
    queries: { key: string; isNumber?: boolean; isOptional?: boolean }[],
  ): RequestHandler =>
  (req, res, next) => {
    queries.forEach(({ key, isNumber, isOptional }) => {
      const queryParam = req.query[key];
      if (isOptional && queryParam === undefined) {
        return;
      }

      if (queryParam === undefined) {
        throw new CustomError({
          status: 400,
          message: `query params: ${key}가 전달되지 않았습니다. - ${key}: ${queryParam}`,
        });
      }

      // string[] 방지
      if (typeof queryParam !== "string") {
        throw new CustomError({
          status: 400,
          message: `query params: ${key}가 문자열이 아닙니다. - ${key}: ${queryParam}`,
        });
      }

      if (isNumber && (/[^0-9]/.test(queryParam) || queryParam === "")) {
        throw new CustomError({
          status: 400,
          message: `query params: ${key}가 숫자가 아닙니다. - ${key}: ${queryParam}`,
        });
      }
    });

    next();
  };
