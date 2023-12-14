import FeedModel from "./feed.model.js";

const feedService = {
  async getFeeds({ cursor, limit }: { cursor: number; limit: number }) {
    const feeds = await FeedModel.find({}).skip(cursor).limit(limit);

    return feeds;
  },
};

export default feedService;
