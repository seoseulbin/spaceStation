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
    return instance.post(`/`, props, {
      withCredentials: true,
    });
  },

  async deleteComment(commentId: string) {
    try {
      const res = await instance.delete(`/${commentId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error("삭제 댓글 에러", error);
      throw error;
    }
  },
};

export default commentAPI;
