import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import commentService from "./comments.service.js";

const commentController = {
  getComment: asyncHandler(async (req, res) => {
    const feedId = req.params.feedId;
    console.log("받은 피드 아이디:", feedId);

    if (!feedId) {
      //일단 아이디 없으면 에러
      return res.status(400).json({ error: "피드 아이디가 필요합니다." });
    }

    const comments = await commentService.getComment(feedId);
    res.json(comments);
  }),

  postComment: asyncHandler(
    async (
      req: Request<{}, {}, { feedId: string; userId: string; content: string }>,
      res,
    ) => {
      const { content, feedId, userId } = req.body;
      if (!content)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      const newComment = await commentService.postComment({
        content,
        feedId,
        userId,
      });
      res.status(200).json({
        message: "성공적으로 댓글이 만들어짐",
        comment: newComment,
      });
    },
  ),

  deleteComment: asyncHandler(
    async (req: Request<{ commentId?: string }>, res) => {
      const { commentId } = req.params;

      //유효성검사 -> 접근할 수 있는 아이디만 삭제를 해야하기 때문
      if (!commentId || !commentId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new CustomError({
          status: 400,
          message: "유효하지 않은 comment ID입니다.",
        });
      }

      await commentService.deleteComment(commentId);

      res.status(204).end(); // 204 -> 성공적으로 수행했지만 응답 페이로드에 추가 콘텐츠가 없음
    },
  ),
};

export default commentController;
