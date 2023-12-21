import { axiosInstance } from "@/global/axiosInstance";
import { CreateFeedType } from "./CreateFeed.type";

const feedAPI = {
  async createFeed({ userId, category, content, imgUrls }: CreateFeedType) {
    try {
      if (!userId || !category || !content || imgUrls.length == 0) {
        throw new Error("정보가 부족합니다.");
      }
      const response = await axiosInstance.post(`/feeds`, {
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
