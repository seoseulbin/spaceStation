import axios from "axios";
import { LikeType } from "./Like.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/likes`,
});

export const likeAPI = {
  async getLikes(feedId: string) {
    const res = await instance.get<LikeType>(`/${feedId}`);
    return res.data;
  },

  async postLikes(feedId: string) {
    const res = await instance.get<LikeType>(`/${feedId}`);
    return res.data;
  },

  async deleteLikes(feedId: string) {
    const res = await instance.delete<LikeType>(`/${feedId}`);
    return res.data;
  },
};
