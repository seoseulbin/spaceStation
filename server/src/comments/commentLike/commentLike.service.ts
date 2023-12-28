import CommentLikeModel from "./commentLike.model.js";
import UserModel from "../../user/user.model.js";
import CommentModel from "../../comments/comments.model.js";
import { CustomError } from "../../middleware/errorHandler.js";
import FeedModel from "../../feed/feed.model.js";

type CommentlikePostType = {
  user: string;
  comment: string;
  feed: string;
};

const commentLikeService = {
  async getLikes({ comment }: Pick<CommentlikePostType, "comment">) {
    return CommentLikeModel.find({ commentId: comment });
  },

  async postLike({ user, comment, feed }: CommentlikePostType) {
    const findUser = await UserModel.findOne({ _id: user }).exec();
    const findComment = await CommentModel.findOne({ _id: comment }).exec();
    const findFeed = await FeedModel.findOne({ _id: feed }).exec();

    if (!findComment || !findUser || !findFeed) {
      throw new CustomError({
        status: 404,
        message: "요청한 Id가 존재하지 않습니다",
      });
    }

    const isExistLike = await CommentLikeModel.findOne({
      userId: findUser._id,
      commentId: findComment._id,
    });

    if (isExistLike) {
      return;
    }

    return await CommentLikeModel.create({
      userId: findUser._id,
      commentId: findComment._id,
      feedId: findFeed?._id,
    });
  },

  async deleteLike({ user, comment, feed }: CommentlikePostType) {
    return await CommentLikeModel.deleteOne({
      userId: user,
      commentId: comment,
      feedId: feed,
    });
  },
};

export default commentLikeService;
