import axios from "axios";
import { CommentType } from "./Comments.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/comments`,
});

const commentAPI = {
  async getComments(feedId: string) {
    try {
      const res = await instance.get<CommentType[]>(`/${feedId}`);
      return res.data;
    } catch (error) {
      console.error("여기가 문제다", error);
      throw error;
    }
  },

  async postComment(props: {
    userId: CommentType["userId"];
    content: CommentType["content"];
    feedId: CommentType["feedId"];
  }) {
    return instance.post(`/`, props);
  },

  async deleteComment(commentId: string) {
    try {
      const res = await instance.delete(`/${commentId}`);
      return res.data;
    } catch (error) {
      console.error("Delete comment error:", error);
      throw error;
    }
  },
};

export default commentAPI;
