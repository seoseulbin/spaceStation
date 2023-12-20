import { axiosInstance } from "@/global/axiosInstance";
import { UpdateFeedType } from "./UpdateFeed.type";

const feedAPI = {
  getFeed: async (_id: string) => {
    const response = await axiosInstance.get<UpdateFeedType>(`/feeds/${_id}`);
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
      const response = await axiosInstance.put(`/feeds/${_id}`, {
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
