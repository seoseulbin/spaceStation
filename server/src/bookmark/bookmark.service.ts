import BookmarkModel, { BookmarkSchemaType } from "./bookmark.model.js";
import { CustomError } from "../middleware/errorHandler.js";

const bookmarkService = {
  async getBookmarksByFeedId(props: { feedId: BookmarkSchemaType["feedId"] }) {
    const { feedId } = props;
    return await BookmarkModel.find({ feedId });
  },

  async getBookmarksByUserId(props: { userId: BookmarkSchemaType["userId"] }) {
    const { userId } = props;
    return await BookmarkModel.find({ userId });
  },

  async postBookmark(props: Pick<BookmarkSchemaType, "userId" | "feedId">) {
    const { userId, feedId } = props;
    const isExistBookmark = await BookmarkModel.findOne({ userId, feedId });

    if (isExistBookmark) {
      return;
    }

    return await BookmarkModel.create({ userId, feedId });
  },

  async deleteBookmark(props: Pick<BookmarkSchemaType, "userId" | "feedId">) {
    const { userId, feedId } = props;

    const result = await BookmarkModel.deleteOne({ userId, feedId });

    if (result.deletedCount === 0)
      throw new CustomError({ status: 500, message: "삭제 실패" });
  },
};

export default bookmarkService;
