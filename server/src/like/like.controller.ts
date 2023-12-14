import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import likeService from "./like.service.js";

const likeController = {
  //TODO : 코드 작성
  getLikes: asyncHandler(async (req, res) => {
    const likes = await likeService.getLikes();
    res.json(likes);
  }),

  updateLikes: asyncHandler(async (req, res) => {}),

  deleteLikes: asyncHandler(async (req, res) => {}),
};

export default likeController;
