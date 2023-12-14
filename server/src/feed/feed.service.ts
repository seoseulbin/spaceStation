import FeedModel from "./feed.model.js";

const feedService = {
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

  //   async updateFeed() {},

  //   async deleteFeed() {},
};

export default feedService;
