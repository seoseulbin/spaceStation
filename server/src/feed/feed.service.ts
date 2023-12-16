import { Types } from "mongoose";
import FeedModel from "./feed.model.js";

const feedService = {
  async getFeeds({ cursor, limit }: { cursor: number; limit: number }) {
    const feeds = await FeedModel.find({}).skip(cursor).limit(limit);

    return feeds;
  },

  async getUserFeeds(props: {
    userId: Types.ObjectId;
    cursor: number;
    limit: number;
  }) {
    const { userId, cursor, limit } = props;
    const feeds = await FeedModel.find({ userId }).skip(cursor).limit(limit);

    return feeds;
  },

  async getCategoryFeeds(props: {
    category: Types.ObjectId;
    cursor: number;
    limit: number;
  }) {
    const { category, cursor, limit } = props;
    const feeds = await FeedModel.find({ category }).skip(cursor).limit(limit);

    return feeds;
  },
};

export default feedService;
