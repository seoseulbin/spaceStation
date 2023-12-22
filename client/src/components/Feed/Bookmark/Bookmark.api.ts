import { BookmarkType } from "./Bookmark.type";
import { axiosInstance } from "../../../global/axiosInstance";

export const bookmarkAPI = {
  async getBookmarks() {
    const res = await axiosInstance.get<BookmarkType[]>(`/bookmarks`);
    return res.data;
  },

  async postBookmark(feedId: string) {
    const res = await axiosInstance.post(
      `/bookmarks`,
      { feedId },
      { withCredentials: true },
    );
    return res.data;
  },

  async deleteBookmark(feedId: string) {
    const res = await axiosInstance.delete(`/bookmarks/${feedId}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
