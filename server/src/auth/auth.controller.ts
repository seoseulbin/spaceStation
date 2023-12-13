import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import axios, { AxiosResponse } from "axios";
import express, { Response, } from "express";
import authService from "./auth.service.js";


const kakaoGetUserInfoURL = "https://kapi.kakao.com/v2/user/me";
const kakaoGetTokenURL = "https://kauth.kakao.com/oauth/token";

const authController = {

  handleKakaoOAuthProcess: asyncHandler(async (req:express.Request, res:Response) => {
    
    const code = await validateKakaoOAuthCode(req.query.code as string);
  
    const { accessToken }:{ accessToken: string } = await getKakaoAccessToken(code);
        
    const userInfo = await getUserInfo(accessToken);

    const isNewUser = await authService.searchUsers(userInfo.id);

    
    if(isNewUser.length === 0) {
      throw new CustomError({
        status: 400,
        message: "가입 정보가 존재하지 않습니다.",
      });
    }
   
    res.status(200)
      .json({
        message: "가입 정보가 존재합니다.",
        user: isNewUser,
      });
    return;

    }),
};

export default authController;



// 인가 코드 검증하는 함수
export async function validateKakaoOAuthCode (
  code:string 
) {
  if (typeof code === 'undefined') {
    throw new CustomError({
      status: 400,
      message: "Authorized Code가 존재하지 않습니다.",
    });
  }
  return code;
}

// 인가 코드를 사용하여 카카오 액세스 토큰을 발급받아 리턴하는 함수
async function getKakaoAccessToken(code: string):Promise<{ accessToken: string }> {
  const REST_API_KEY: string | undefined = process.env.REST_API_KEY as string;
  const FRONTEND_URL: string | undefined = process.env.FRONTEND_URL as string;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = new URLSearchParams();
  data.append("grant_type", "authorization_code");
  data.append("client_id", REST_API_KEY);
  data.append("redirect_uri", `${FRONTEND_URL}/login?oauth=kakao`);
  data.append("code", code);

  try {
    const response: AxiosResponse<any> = await axios.post(kakaoGetTokenURL, data, { headers });
    return { accessToken:response.data.access_token };
  } catch (error) {
    throw new CustomError({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

// 발급된 액세스 토큰으로 유저 정보를 반환하는 함수
async function getUserInfo(accessToken:string):Promise<any> {
  const header = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Authorization": `Bearer ${accessToken}`,
  };
  
  try {
    const result: AxiosResponse<any> = await axios.get(kakaoGetUserInfoURL, {headers: header})
    return {
      id : result.data.id, 
      nickname : result.data.kakao_account.profile.nickname,
      profile: result.data.kakao_account.profile.thumbnail_image_url,
    }
  } catch (error) {
    throw new CustomError({
      status: 500,
      message: "Internal Server Error",
    });
  }
}