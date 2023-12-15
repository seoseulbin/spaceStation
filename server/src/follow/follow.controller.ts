import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import followService from "./follow.service.js";

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
      const { follower, following } = req.body;
      if (!follower)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      followService.postFollow({ follower, following });
      res.status(200).end();
    },
  ),
  deleteFollow: asyncHandler(
    async (req: Request<{ follower?: string }>, res) => {
      const { follower } = req.params;
      if (!follower)
        //TODO: follower ID 검증
        throw new CustomError({
          status: 400,
          message: "유효하지 않은 ID입니다.",
        });
      await followService.deleteFollow(follower);
      res.status(200).end();
    },
  ),
};
export default followController;
