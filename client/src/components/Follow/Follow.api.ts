import { FollowType } from "./Follow.type";
import { axiosInstance } from "@/global/axiosInstance";

const followAPI = {
  async getFollows(follower: string) {
    const res = await axiosInstance.get<{
      follower: FollowType[];
      following: FollowType[];
    }>(`/follows/${follower}`);
    return res.data;
  },

  async postFollow(props: { follower: FollowType["follower"] }) {
    return axiosInstance.post(`/follows/`, props, {
      withCredentials: true,
    });
  },

  async deleteFollow(follower: string) {
    return axiosInstance.delete(`/follows/${follower}`, {
      withCredentials: true,
    });
  },
};

export default followAPI;
