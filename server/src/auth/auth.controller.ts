import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";

const authController = {
  getKakaoAppkey: asyncHandler(async (_, res) => {
    const appKey = process.env.KAKAO_APP_KEY;
    if (!appKey) {
      throw new CustomError({
        status: 400,
        message: "App key가 존재하지 않습니다.",
      });
    }
    res.status(200).json({"appKey" : appKey});
  }),
};

export default authController;
