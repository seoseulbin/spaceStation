import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import commentService from "./comments.service.js";

const commentController = {
  getComment: asyncHandler(async (_, res) => {
    const comment = await commentService.getComment();
    res.json(comment);
  }),

  postComment: asyncHandler(
    async (req: Request<{}, {}, { content: string }>, res) => {
      const { content } = req.body;
      if (!content)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      commentService.postComment({ content });
      res.status(200).end();
    },
  ),

  deleteComment: asyncHandler(
    async (req: Request<{ userId?: string }>, res) => {
      const { userId } = req.params;

      //유효성검사 -> 접근할 수 있는 아이디만 삭제를 해야하기 때문
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new CustomError({
          status: 400,
          message: "유효하지 않은 comment ID입니다.",
        });
      }

      await commentService.deleteComment(userId);

      res.status(204).end(); // 204 -> 성공적으로 수행했지만 응답 페이로드에 추가 콘텐츠가 없음
    },
  ),
};

export default commentController;
