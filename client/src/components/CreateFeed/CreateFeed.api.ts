import axios from "axios";
import { createfeedType } from "./CreateFeed.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  createFeed: async ({
    userId,
    category,
    content,
    imgUrls,
  }: createfeedType) => {
    try {
      if (!userId || !category || !content || imgUrls.length == 0) {
        throw new Error("정보가 부족합니다.");
      }
      const response = await instance.post(`/`, {
        userId,
        category,
        content,
        imgUrls,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  },
};
export default feedAPI;
