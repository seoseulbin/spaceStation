import axios from "axios";
import { FollowType } from "./Follow.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/follows`,
});

// 특정 쿠키의 값을 가져오기
const getCookieValue = (cookieName: string) => {
  const cookies = document.cookie;
  const cookieParts = cookies.split("; ");

  for (const cookie of cookieParts) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }

  return null;
};

const authTokenValue = getCookieValue("service_token");

const followAPI = {
  async getFollows(follower: string) {
    const res = await instance.get<{
      follower: FollowType[];
      following: FollowType[];
    }>(`/${follower}`);
    return res.data;
  },

  async postFollow(props: { follower: FollowType["follower"] }) {
    const headers = {
      Authorization: `Bearer ${authTokenValue}`,
    };
    return instance.post(`/`, props, { headers });
  },

  async deleteFollow(follower: string) {
    const headers = {
      Authorization: `Bearer ${authTokenValue}`,
    };
    return instance.delete(`/${follower}`, { headers });
  },
};

export default followAPI;
