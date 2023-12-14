import FollowModel from "./follow.model.js";

const followService = {
  async getFollows() {
    return FollowModel.find({});
  },
  async postFollow({
    follower,
    following,
  }: {
    follower: string;
    following: string;
  }) {
    return FollowModel.create({ follower, following });
  },
  async deleteFollow(_id: string) {
    return FollowModel.deleteOne({ _id });
  },
};

export default followService;
