import LikeModel from "./like.model";
//TODO : User, Feed model import

type likePostType = {
  user: string;
  feed: string;
};

const likeService = {
  async getLikes() {
    return LikeModel.find({});
  },

  //TODO : model import 후 주석 제거 필요
  async postLike({ user, feed }: likePostType) {
    // const userId = UserModel.findOne({ _id: user });
    // const feedId = FeedModel.findOne({ _id: feed });
    // return LikeModel.create({ userId:userId._id, feedId:feedId._id });
  },

  async deleteLike({ feed }: Pick<likePostType, "feed">) {
    // return FeedModel.deleteOne({ _id: feed });
  },
};

export default likeService;
