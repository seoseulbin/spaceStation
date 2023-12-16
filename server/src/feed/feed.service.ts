import FeedModel from "./feed.model.js";
import mongoose from "mongoose";

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
