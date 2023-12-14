import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import express, { Response } from "express";
import authService from "./auth.authService.js";
import userService from "./auth.userService.js";

const kakaoGetUserInfoURL = "https://kapi.kakao.com/v2/user/me";
const kakaoGetTokenURL = "https://kauth.kakao.com/oauth/token";

const authController = {
  handleKakaoOAuthProcess: asyncHandler(
    async (req: express.Request, res: Response) => {
      const code = await validateKakaoOAuthCode(req.query.code as string);

      const data = await getKakaoAccessToken(code);
      //console.log("access_token", data.accessToken);
      const userInfo = await getUserInfo(data.accessToken);

      const isNewUser = await authService.searchUsers(userInfo.id);

      if (isNewUser.length === 0) {
        console.log("가입 정보가 존재하지 않습니다.");
        const result = await userService.signUp(userInfo.id);
        if (result !== null) {
          res.redirect(`${process.env.FRONTEND_URL}`);
          return;
        }
      }

      res.status(200).json({
        message: "가입 정보가 존재합니다.",
        user: isNewUser,
        userInfo: userInfo,
      });
    },
  ),
  handleLogin: asyncHandler(async () => {
    return await userService.signIn();
  }),
  handleJoin: asyncHandler(async (req: express.Request, res: Response) => {
    const snsId = req.body.snsId;
    const result = await userService.signUp(snsId);
    if (result !== null) {
      res.status(200).json({
        message: "회원 가입에 성공했습니다.",
        user: result,
      });
    }
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
  const REST_API_KEY: string | undefined = process.env.REST_API_KEY as string;
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
  //console.log(data);

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
  //console.log(headers);

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
