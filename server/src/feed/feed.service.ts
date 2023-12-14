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
    return FeedModel.findByIdAndUpdate(id, {
      category,
      content,
      imgUrls,
    });
  },

  async deleteFeed({ id }: { id: string }) {
    return FeedModel.deleteOne({ id });
  },
};

export default feedService;
