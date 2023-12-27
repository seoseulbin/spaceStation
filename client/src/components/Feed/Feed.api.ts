import axios from "axios";
import { FeedType } from "./Feed.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  async getMainFeeds({ cursor, limit }: { cursor: number; limit: number }) {
    const { data } = await instance.get<FeedType[]>(
      `/?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },

  async getProfileFeeds(props: {
    userId: string;
    cursor: number;
    limit: number;
  }) {
    const { userId, cursor, limit } = props;
    const { data } = await instance.get<FeedType[]>(
      `/profiles/${userId}?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },

  async getCategoryFeeds(props: {
    categoryId: string;
    cursor: number;
    limit: number;
  }) {
    const { categoryId, cursor, limit } = props;
    const { data } = await instance.get<FeedType[]>(
      `/categories/${categoryId}?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },

  async getMyBookmarkFeeds(props: { cursor: number; limit: number }) {
    const { cursor, limit } = props;
    const { data } = await instance.get<{ feedId: FeedType }[]>(
      `/bookmarks/mine?cursor=${cursor}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );

    return { data: data.map((d) => d.feedId), nextCursor: cursor + limit };
  },

  async getSearchFeeds(props: {
    query: string;
    cursor: number;
    limit: number;
  }) {
    const { query, cursor, limit } = props;
    const { data } = await instance.get<FeedType[]>(
      `/search/${query}?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },
};

export default feedAPI;
