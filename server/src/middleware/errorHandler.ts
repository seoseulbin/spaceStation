import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  status: number;
  message: string;
  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line no-unused-vars
) {
  // TODO: 배포시 에러 로그 파일로 남기기
  console.log(`[${new Date()}]` + err);

  return res.status(err instanceof CustomError ? err.status : 500).json({
    result: "fail",
    error: err.message || "undefined error",
  });
}

export default errorHandler;
