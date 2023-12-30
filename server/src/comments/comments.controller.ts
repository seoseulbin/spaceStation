import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import commentService from "./comments.service.js";

//validation 처리를 위한 별도 미들웨어를 구성하시면 컨트롤러 코드를 훨씬 간결하게 구성할 수 있습니다.
const commentController = {
  getComment: asyncHandler(async (req, res) => {
    const feedId = req.params.feedId;

    if (!feedId) {
      //일단 아이디 없으면 에러
      return res.status(400).json({ error: "피드 아이디가 필요합니다." });
    }

    const comments = await commentService.getComment(feedId);
    res.json(comments);
  }),

  postComment: asyncHandler(
    async (
      req: Request<
        {},
        {},
        {
          feedId: string;
          userId: string;
          content: string;
          parentCommentId?: string;
        }
      >,
      res,
    ) => {
      const { content, feedId, userId, parentCommentId } = req.body;
      if (!content)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      const newComment = await commentService.postComment({
        content,
        feedId,
        userId,
        parentCommentId,
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
      if (!commentId) {
        throw new CustomError({
          status: 400,
          message: "Comment ID is required.",
        });
      }

      await commentService.deleteComment(commentId);

      res.status(204).end(); // 204 -> 성공적으로 수행했지만 응답 페이로드에 추가 콘텐츠가 없음
    },
  ),
};

export default commentController;
