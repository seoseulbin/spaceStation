import { axiosInstance } from "../../../global/axiosInstance";
import { LikeType } from "./Like.type";

export const likeAPI = {
  async getLikes(feedId: string) {
    const res = await axiosInstance.get<LikeType[]>(`/likes/${feedId}`);
    return res.data;
  },

  async postLikes(feedId: string) {
    const res = await axiosInstance.post(
      `/likes`,
      { feedId },
      { withCredentials: true },
    );
    return res.data;
  },

  async deleteLikes(feedId: string) {
    const res = await axiosInstance.delete(`/likes/${feedId}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
