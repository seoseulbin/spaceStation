import FeedModel from "./feed.model.js";

const feedService = {
  async getFeeds() {
    const feeds = await FeedModel.find({});

    return feeds;
  },
};

export default feedService;
