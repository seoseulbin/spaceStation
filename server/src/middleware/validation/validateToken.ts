import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errorHandler.js";
import { authService } from "../../auth/auth.service.js";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const userToken = req.cookies.service_token;
  if (!userToken) {
    throw new CustomError({
      status: 400,
      message: "토큰이 없습니다.",
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    jwt.verify(userToken, secretKey) as JwtPayload;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new CustomError({
        status: 400,
        message: "토큰의 유효기간이 지났습니다.",
      });
    }
    throw new CustomError({
      status: 400,
      message: "유효한 토큰이 아닙니다.",
    });
  }
}

export function validateWithUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userToken = req.cookies.service_token;
  const tokenUserId = authService.extractDataFromToken(userToken, "user_id");
  const { userId } = req.params;

  if (tokenUserId !== userId) {
    throw new CustomError({
      status: 400,
      message: "토큰의 회원 정보가 일치하지 않습니다.",
    });
  }
  next();
}
