import { BookmarkType } from "./Bookmark.type";
import { axiosInstance } from "../../../global/axiosInstance";
import { FeedType } from "../Feed.type";

export const bookmarkAPI = {
  async getBookmarkByFeedId(feedId: string) {
    const res = await axiosInstance.get<BookmarkType[]>(`/bookmarks/${feedId}`);
    return res.data;
  },

  //TODO : 마이페이지 북마크 리스크만 보이기
  async getBookmarkFeedByUserId(props: {
    userId: string;
    cursor: number;
    limit: number;
  }) {
    const { userId, cursor, limit } = props;
    const { data } = await axiosInstance.get<FeedType[]>(
      `/?userId=${userId}&cursor=${cursor}&limit=${limit}`,
    );
    return { data, nextCursor: cursor + limit };
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
