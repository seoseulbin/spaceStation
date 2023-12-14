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

    return { data, nextCursor: cursor + 3 };
  },
};

export default feedAPI;
