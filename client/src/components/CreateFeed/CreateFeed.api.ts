import { axiosInstance } from "@/global/axiosInstance";
import { CreateFeedType } from "./CreateFeed.type";

const feedAPI = {
  async createFeed({ userId, category, content, imgUrls }: CreateFeedType) {
    const response = await axiosInstance.post(
      `/feeds`,
      {
        userId,
        category,
        content,
        imgUrls,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
};
export default feedAPI;
