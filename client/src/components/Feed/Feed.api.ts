import axios from "axios";
import { FeedType } from "./Feed.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  async getFeeds() {
    const res = await instance.get<FeedType[]>(`/`);

    return res.data;
  },
};

export default feedAPI;
