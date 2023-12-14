import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import followService from "./follow.service.js";

const followController = {
  getFollows: asyncHandler(async (req, res) => {
    const follows = await followService.getFollows();
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
    async (req: Request<{ followid?: string }>, res) => {
      const { followid } = req.params;
      if (!followid)
        throw new CustomError({
          status: 400,
          message: "유효하지 않은 ID입니다.",
        });
      await followService.deleteFollow(followid);
      res.status(200).end();
    },
  ),
};
export default followController;
