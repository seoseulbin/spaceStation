import { axiosInstance } from "../../../../global/axiosInstance";
import { CommentLikeType } from "./CommentLike.type";

export const commentLikeAPI = {
  async getLikes(commentId: string) {
    const res = await axiosInstance.get<CommentLikeType[]>(
      `/commentLikes/${commentId}`,
    );
    return res.data;
  },

  async postLikes({
    commentId,
    feedId,
  }: {
    commentId: string;
    feedId: string;
  }) {
    const res = await axiosInstance.post(
      `/commentLikes`,
      { commentId, feedId }, // Add feedId to the request body
      { withCredentials: true },
    );
    return res.data;
  },

  async deleteLikes(commentId: string) {
    const res = await axiosInstance.delete(`/commentLikes/${commentId}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
