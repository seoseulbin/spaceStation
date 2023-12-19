import LikeModel from "./like.model.js";
import UserModel from "../user/user.model.js";
import FeedModel from "../feed/feed.model.js";
import { CustomError } from "../middleware/errorHandler.js";

type likePostType = {
  user: string;
  feed: string;
};

const likeService = {
  async getLikes({ feed }: Pick<likePostType, "feed">) {
    return LikeModel.find({ feedId: feed });
  },

  async postLike({ user, feed }: likePostType) {
    const findUser = await UserModel.findOne({ _id: user }).exec();
    const findFeed = await FeedModel.findOne({ _id: feed }).exec();

    if (!findFeed || !findUser) {
      throw new CustomError({
        status: 404,
        message: "요청한 Id가 존재하지 않습니다",
      });
    }

    const isExistLike = await LikeModel.findOne({
      userId: findUser._id,
      feedId: findFeed._id,
    });

    if (isExistLike) {
      return;
    }

    return LikeModel.create({
      userId: findUser._id,
      feedId: findFeed._id,
    });
  },

  async deleteLike({ user, feed }: likePostType) {
    return LikeModel.deleteOne({ userId: user, feedId: feed });
  },
};

export default likeService;
