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

  async getFollowers(userid: string) {
    return FollowModel.find({ follower: userid });
  },

  async getFollowings(userid: string) {
    return FollowModel.find({ following: userid });
  },

  async postFollow({ follower, following }: FollowPostType) {
    return FollowModel.create({ follower, following });
  },

  async deleteFollow(follower: string, following: string) {
    return FollowModel.deleteOne({ follower: follower, following: following });
  },

  async deleteFollowById(_id: string) {
    return FollowModel.deleteOne({ _id });
  },

  async checkFollow() {
    return {}; //해당 유저를 팔로우했는지, 본인인지..?확인하는 분기..?
  },
};

export default followService;
