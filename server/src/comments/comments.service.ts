import CommentModel from "./comments.model.js";
import CommentLikeModel from "./commentLike/commentLike.model.js";

const commentService = {
  //각각 피드 아이디에 맞는 댓글들만 분류해서 가져오기
  async getComment(feedId: string) {
    //const query = feedId ? { feedId } : {};
    return CommentModel.find({ feedId });
  },

  //유저 아이디와 피드아이디, 댓글 내용을 가지고 와서 post
  async postComment({
    userId,
    feedId,
    content,
  }: {
    feedId: string;
    userId: string;
    content: string;
  }) {
    return CommentModel.create({ userId, feedId, content });
  },

  //댓글 아이디를 가져와서 해당 아이디만 삭제
  async deleteComment(commentId: string) {
    await CommentModel.findByIdAndDelete(commentId);
    await CommentLikeModel.deleteMany({ commentId });
  },
};

export default commentService;
