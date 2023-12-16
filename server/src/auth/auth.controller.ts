import jwt from "jsonwebtoken";
import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import express, { Response } from "express";
import userService from "./auth.service.js";

const kakaoGetUserInfoURL = "https://kapi.kakao.com/v2/user/me";
const kakaoGetTokenURL = "https://kauth.kakao.com/oauth/token";

const authController = {
  handleKakaoOAuthProcess: asyncHandler(
    async (req: express.Request, res: Response) => {
      const code = await validateKakaoOAuthCode(req.query.code as string);

      const data = await getKakaoAccessToken(code);

      const userInfo = await getUserInfo(data.accessToken);

      const isNewUser = await userService.searchUsers(userInfo.id);
      const action = isNewUser.length === 0 ? "join" : "login";

      console.log(
        `가입 정보가 ${
          action === "join" ? "존재하지 않습니다." : "존재합니다."
        }`,
      );
      const result = await handleAuthUser(userInfo, action);
      const token = generateJWT(result.user._id, result.user.nickname);
      console.log(result, token);
      res.cookie("service_token", token, { httpOnly: true });
      res.redirect(`${process.env.FRONTEND_URL}`);
    },
  ),
  handleLogin: asyncHandler(async (req: express.Request, res: Response) => {
    const snsId = req.body.snsId;
    const result = await userService.signIn(snsId);
    if (!result) {
      res.status(404).json({
        message: "존재하지 않는 id입니다.",
      });
      return;
    }

    res.status(200).json({
      message: "로그인에 성공했습니다.",
      user: result,
    });
  }),
  handleJoin: asyncHandler(async (req: express.Request, res: Response) => {
    const snsId = req.body.snsId;
    const result = await userService.signUp(snsId);
    if (!result) {
      res.status(400).json({
        message: "회원 가입에 실패했습니다.",
      });
      return;
    }
    res.status(201).json({
      message: "회원 가입에 성공했습니다.",
      user: result,
    });
  }),
};

export default authController;

// 인가 코드 검증하는 함수
export async function validateKakaoOAuthCode(code: string) {
  if (typeof code === "undefined") {
    throw new CustomError({
      status: 400,
      message: "Authorized Code가 존재하지 않습니다.",
    });
  }
  return code;
}

// 인가 코드를 사용하여 카카오 액세스 토큰을 발급받아 리턴하는 함수
async function getKakaoAccessToken(
  code: string,
): Promise<{ accessToken: string }> {
  const REST_API_KEY: string | undefined = process.env
    .KAKAO_REST_API_KEY as string;
  const BACKEND_URL: string | undefined = process.env.BACKEND_URL as string;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = {
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: `${BACKEND_URL}/api/auth/oauth`,
    code: code,
  };

  try {
    const response = await fetch(kakaoGetTokenURL, {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(data),
    });
    const result = await response.json();
    return { accessToken: result.access_token };
  } catch (error) {
    throw new CustomError({
      status: 500,
      message: "엑세스 토큰 발급에 실패했습니다.",
    });
  }
}

// 발급된 액세스 토큰으로 유저 정보를 반환하는 함수
async function getUserInfo(accessToken: string): Promise<any> {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: "Bearer " + accessToken,
  };

  try {
    const response = await fetch(kakaoGetUserInfoURL, { headers });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new CustomError({
      status: 500,
      message: "카카오 회원 정보 조회에 실패했습니다.",
    });
  }
}

// JWT 토큰 생성하고 반환하는 함수
function generateJWT(userId: string, nickname: string): string {
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 현재시간 + @, e.g. 60*60 = 1시간 후 만료
  const payload = {
    user_id: userId,
    nickname: nickname,
    exp: expirationTime,
  };

  const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const token = jwt.sign(payload, secretKey);

  return token;
}

// /api/auth/join API를 호출하여 결과를 반환하는 함수
async function handleAuthUser(userInfo: { id: string }, api: string) {
  const data = {
    snsId: userInfo.id,
  };
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result) {
    throw new CustomError({
      status: 500,
      message:
        api && "join" ? "회원 가입에 실패했습니다." : "로그인에 실패했습니다.",
    });
  }
  return result;
}
