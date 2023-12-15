import axios from "axios";
import { FollowType } from "./Follow.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/follows`,
});

const followAPI = {
  async getFollows(follower: string) {
    const res = await instance.get<FollowType[]>(`/${follower}`);
    return res.data;
  },

  async postFollow(props: {
    follower: FollowType["follower"];
    following: FollowType["following"];
  }) {
    return instance.post(`/`, props);
  }, //토큰 없이 팔로우post 테스트

  // async postFollow(props: { follower: FollowType["follower"] }) {
  //   return instance.post(`/`, props);
  // },

  async deleteFollow(follower: string) {
    return instance.delete(`/${follower}`);
  },
};

export default followAPI;
