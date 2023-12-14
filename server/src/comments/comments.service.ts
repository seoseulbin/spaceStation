import CommentModel from "./comments.model.js";

const commentService = {
  async getComment() {
    return CommentModel.find({});
  },

  async postComment({ content }: { content: string }) {
    return CommentModel.create({ content });
  },

  async deleteComment(commentId: string) {
    return CommentModel.findByIdAndDelete(commentId);
  },
};

export default commentService;
