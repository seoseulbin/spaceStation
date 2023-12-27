import BookmarkModel from "../bookmark/bookmark.model.js";
import FeedModel from "./feed.model.js";
import mongoose, { Types } from "mongoose";

const feedService = {
  async getFeed({ id }: { id: string }) {
    const objectId = new mongoose.Types.ObjectId(id);

    return FeedModel.findOne({ _id: objectId });
  },

  async getFeeds({ cursor, limit }: { cursor: number; limit: number }) {
    const feeds = await FeedModel.find({})
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getUserFeeds(props: {
    userId: Types.ObjectId;
    cursor: number;
    limit: number;
  }) {
    const { userId, cursor, limit } = props;
    const feeds = await FeedModel.find({ userId })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getCategoryFeeds(props: {
    category: Types.ObjectId;
    cursor: number;
    limit: number;
  }) {
    const { category, cursor, limit } = props;
    const feeds = await FeedModel.find({ category })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getUserBookmarkFeeds(props: {
    userId: Types.ObjectId;
    cursor: number;
    limit: number;
  }) {
    const { userId, cursor, limit } = props;
    const feeds = await BookmarkModel.find({ userId })
      .skip(cursor)
      .limit(limit)
      .sort({ created: -1 })
      .populate({ path: "feedId", strictPopulate: false });

    return feeds;
  },

  async createFeed({
    userId,
    category,
    content,
    imgUrls,
    geoLocation,
  }: {
    userId: string;
    category: string;
    content: string;
    imgUrls: string[];
    geoLocation: {
      content: string;
      position: {
        lat: number;
        lng: number;
      };
    };
  }) {
    return FeedModel.create({
      userId,
      category,
      content,
      imgUrls,
      geoLocation,
    });
  },

  async updateFeed({
    id,
    userId,
    category,
    content,
    imgUrls,
  }: {
    id: string;
    userId: string;
    category: string;
    content: string;
    imgUrls: string[];
  }) {
    const objectId = new mongoose.Types.ObjectId(id);

    return FeedModel.findByIdAndUpdate(
      { _id: objectId },
      {
        userId,
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
