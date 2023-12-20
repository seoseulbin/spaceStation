import axios from "axios";
import { UpdateFeedType } from "./UpdateFeed.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  getFeed: async (_id: string) => {
    const response = await instance.get<UpdateFeedType>(`/${_id}`);
    return response.data;
  },

  updateFeed: async ({
    _id,
    userId,
    category,
    content,
    imgUrls,
  }: UpdateFeedType) => {
    try {
      const response = await instance.put(`/${_id}`, {
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
