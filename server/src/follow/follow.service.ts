import FollowModel from "./follow.model.js";

const followService = {
  async getFollows() {
    return FollowModel.find({});
  },
};

export default followService;
