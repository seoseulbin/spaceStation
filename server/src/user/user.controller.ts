import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import userService from "./user.service.js";

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const { userid } = req.params;
    if (!userid)
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });

    const user = await userService.getUser(userid);
    res.json(user);
  }),

  updateUser: asyncHandler(async (req, res) => {
    const { userid, nickname, profileImgUrl } = req.body;

    if (!nickname || !profileImgUrl) {
      throw new CustomError({
        status: 400,
        message: "요청에 필요한 정보가 부족합니다.",
      });
    }

    userService.updateUser(userid, { nickname, profileImgUrl });
    res.status(200).end();
  }),
};

export default userController;
