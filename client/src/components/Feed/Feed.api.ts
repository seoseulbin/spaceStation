import axios from "axios";
import { FeedType } from "./Feed.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  async getFeeds({ cursor, limit }: { cursor: number; limit: number }) {
    const { data } = await instance.get<FeedType[]>(
      `/?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },

  async getUserFeeds(props: { userId: string; cursor: number; limit: number }) {
    const { userId, cursor, limit } = props;
    const { data } = await instance.get<FeedType[]>(
      `/?userId=${userId}&cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },

  async getCategoryFeeds(props: {
    category: string;
    cursor: number;
    limit: number;
  }) {
    const { category, cursor, limit } = props;
    const { data } = await instance.get<FeedType[]>(
      `/?category=${category}&cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },
};

export default feedAPI;
