import CommentModel from "./comments.model.js";
import CommentLikeModel from "./commentLike/commentLike.model.js";

const commentService = {
  //각각 피드 아이디에 맞는 댓글들만 분류해서 가져오기
  async getComment(feedId: string) {
    //const query = feedId ? { feedId } : {};
    const comments = CommentModel.find({ feedId }).populate({
      path: "comments",
      populate: { path: "comments" },
      strictPopulate: false,
    });
    return comments;
  },

  //유저 아이디와 피드아이디, 댓글 내용을 가지고 와서 post
  async postComment({
    userId,
    feedId,
    content,
    parentCommentId,
  }: {
    feedId: string;
    userId: string;
    content: string;
    parentCommentId?: string | null;
  }) {
    const newComment = await CommentModel.create({
      userId,
      feedId,
      content,
      parentCommentId: parentCommentId || null,
    });

    if (parentCommentId) {
      await CommentModel.findByIdAndUpdate(parentCommentId, {
        $addToSet: { comments: newComment._id },
      });
    }

    return newComment;
  },

  //댓글 아이디를 가져와서 해당 아이디만 삭제
  async deleteComment(commentId: string) {
    // 지우는 대상을 찾아내서
    const deletedComment = await CommentModel.findById(commentId).lean();

    //존재를 하고, parentCommentId가 null이면 = 최상단이면
    if (deletedComment && deletedComment.parentCommentId === null) {
      // 댓글들의 parentCommentId 중에서 deletedComment의 댓글이랑 같으면 댓글 지우고
      await CommentModel.deleteMany({ parentCommentId: deletedComment._id });

      // // 그 댓글 안에 있는 좋아요까지 지우기
      await CommentLikeModel.deleteMany({
        parentCommentId: deletedComment._id,
      });
    }

    // 마지막으로 젤 상단의 댓글 지우기
    await CommentModel.findByIdAndDelete(commentId);
    await CommentLikeModel.deleteMany({ commentId });
  },
};

export default commentService;
