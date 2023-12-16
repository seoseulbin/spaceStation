import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import followService from "./follow.service.js";

const userId = "657c89bb7e02fb18144b1dc0"; //헤더로 받는 값 임시지정, middleware에서 처리 필요

const followController = {
  getFollows: asyncHandler(async (req: Request<{ userid?: string }>, res) => {
    const { userid } = req.params;
    if (!userid)
      //TODO: follower ID 검증
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });
    const follows = await followService.getFollows(userid);
    res.json(follows);
  }),

  postFollow: asyncHandler(
    async (
      req: Request<{}, {}, { follower: string; following: string }>,
      res,
    ) => {
      const { follower } = req.body;
      //const.following = req.userId;
      const following = userId;
      if (!follower)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      else if (follower === following)
        throw new CustomError({
          status: 400,
          message: "자신을 팔로우 할 수 없습니다.",
        });
      followService.postFollow({ follower, following });
      res.status(200).end();
    },
  ),

  deleteFollow: asyncHandler(async (req, res) => {
    const { follower } = req.params;
    //const.following = req.userId;
    const following = userId;
    if (!follower)
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });
    else if (follower === following)
      throw new CustomError({
        status: 400,
        message: "자신을 언팔로우 할 수 없습니다.",
      });
    await followService.deleteFollow(follower, following);
    res.status(200).end();
  }),
};
export default followController;
