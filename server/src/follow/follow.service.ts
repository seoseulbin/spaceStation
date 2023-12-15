import FollowModel from "./follow.model.js";

type FollowPostType = {
  follower: string;
  following: string;
};

const followService = {
  async getFollows(userid: string) {
    const followingList = await FollowModel.find({ following: userid });
    const followerList = await FollowModel.find({ follower: userid });

    return { following: followingList, follower: followerList };
  },

  async postFollow({ follower, following }: FollowPostType) {
    return FollowModel.create({ follower, following });
  },
  async deleteFollow(follower: string) {
    return FollowModel.deleteOne({ follower: follower });
  },
};

export default followService;
