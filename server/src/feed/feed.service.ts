import BookmarkModel from "../bookmark/bookmark.model.js";
import LikeModel from "../like/like.model.js";
import FeedModel, { FeedSchemaType } from "./feed.model.js";
import mongoose, { Types, startSession } from "mongoose";
import CommentModel from "../comments/comments.model.js";

import CommentLikeModel from "../comments/commentLike/commentLike.model.js";

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

  async getFeedsFindByProp<T extends keyof FeedSchemaType>(props: {
    prop: { key: T; value: FeedSchemaType[T] };
    cursor: number;
    limit: number;
  }) {
    const { prop, cursor, limit } = props;
    const feeds = await FeedModel.find({ [prop.key]: prop.value })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getFeedsSearchedByRegExp(props: {
    query: { key: keyof FeedSchemaType; regExp: RegExp };
    cursor: number;
    limit: number;
  }) {
    const { query, cursor, limit } = props;
    const feeds = await FeedModel.find({
      [query.key]: { $regex: query.regExp },
    })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getFeedsHashtag(props: {
    hashtag: string;
    cursor: number;
    limit: number;
  }) {
    const { hashtag, cursor, limit } = props;
    const feeds = await FeedModel.find({
      hashtag: { $in: [`#${hashtag}`] },
    })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    return feeds;
  },

  async getFeedsGeoLocation(props: {
    geoLocationContent: string;
    cursor: number;
    limit: number;
  }) {
    const { geoLocationContent, cursor, limit } = props;
    const feeds = await FeedModel.find({
      "geoLocation.content": geoLocationContent,
    })
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
    hashtag,
    geoLocation,
  }: {
    userId: string;
    category: string;
    content: string;
    imgUrls: string[];
    hashtag?: string[];
    geoLocation?: {
      content?: string;
      position?: {
        lat?: number;
        lng?: number;
      };
    };
  }) {
    return FeedModel.create({
      userId,
      category,
      content,
      imgUrls,
      hashtag,
      geoLocation,
    });
  },

  async updateFeed({
    id,
    userId,
    category,
    content,
    imgUrls,
    hashtag,
    geoLocation,
  }: {
    id: string;
    userId: string;
    category: string;
    content: string;
    imgUrls: string[];
    hashtag?: string[];
    geoLocation?: {
      content?: string;
      position?: {
        lat?: number;
        lng?: number;
      };
    };
  }) {
    const objectId = new mongoose.Types.ObjectId(id);

    return FeedModel.findByIdAndUpdate(
      { _id: objectId },
      {
        userId,
        category,
        content,
        imgUrls,
        hashtag,
        geoLocation,
      },
    );
  },

  async deleteFeed({ id }: { id: string }) {
    const session = await startSession();
    session.startTransaction();
    try {
      const deleteFeedResult = await FeedModel.findByIdAndDelete(id);
      if (!deleteFeedResult) throw new Error("삭제 실패");

      await LikeModel.findOneAndDelete({ feedId: id });

      await BookmarkModel.deleteMany({ feedId: id });

      await CommentModel.deleteMany({ feedId: id });
      await CommentLikeModel.deleteMany({ feedId: id });
      await session.commitTransaction();
    } finally {
      session.endSession();
    }
  },
};

export default feedService;
