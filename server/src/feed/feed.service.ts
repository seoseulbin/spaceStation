import FeedModel from "./feed.model.js";
import mongoose, { Types } from "mongoose";

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
  async createFeed({
    userId,
    category,
    content,
    imgUrls,
  }: {
    userId: string;
    category: string;
    content: string;
    imgUrls: string[];
  }) {
    return FeedModel.create({ userId, category, content, imgUrls });
  },

  async updateFeed({
    id,
    category,
    content,
    imgUrls,
  }: {
    id: string;
    category: string;
    content: string;
    imgUrls: string[];
  }) {
    const objectId = new mongoose.Types.ObjectId(id);

    return FeedModel.findByIdAndUpdate(
      { _id: objectId },
      {
        category,
        content,
        imgUrls,
      },
    );
  },
  async deleteFeed({ id }: { id: string }) {
    const objectId = new mongoose.Types.ObjectId(id);

    return FeedModel.deleteOne({ _id: objectId });
  },
};

export default feedService;
