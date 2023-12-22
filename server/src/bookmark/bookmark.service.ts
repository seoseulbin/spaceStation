import UserModel from "../user/user.model.js";
import FeedModel from "../feed/feed.model.js";
import BookmarkModel from "./bookmark.model.js";
import { CustomError } from "../middleware/errorHandler.js";

type bookmarkType = {
  user: string;
  feed: string;
};

const bookmarkService = {
  async getBookmarks({ user }: { user: bookmarkType["user"] }) {
    return await BookmarkModel.find({ userId: user });
  },

  async postBookmark({ user, feed }: bookmarkType) {
    const findUser = await UserModel.findOne({ _id: user }).exec();
    const findFeed = await FeedModel.findOne({ _id: feed }).exec();

    if (!findFeed || !findUser) {
      throw new CustomError({
        status: 404,
        message: "요청한 Id가 존재하지 않습니다",
      });
    }

    const isExistBookmark = await BookmarkModel.findOne({
      userId: findUser._id,
      feedId: findFeed._id,
    });

    if (isExistBookmark) {
      return;
    }

    return await BookmarkModel.create({
      userId: findUser._id,
      feedId: findFeed._id,
    });
  },

  async deleteBookmark({ user, feed }: bookmarkType) {
    return await BookmarkModel.deleteOne({ userId: user, feedId: feed });
  },
};

export default bookmarkService;
