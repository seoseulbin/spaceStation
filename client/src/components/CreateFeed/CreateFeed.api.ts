import { axiosInstance } from "@/global/axiosInstance";
import { CreateFeedType } from "./CreateFeed.type";

const feedAPI = {
  async createFeed({
    category,
    content,
    imgUrls,
    hashtag,
    geoLocation,
  }: CreateFeedType) {
    const removeWhiteSpace = hashtag.replace(/\s/g, "");
    const response = await axiosInstance.post(
      `/feeds`,
      {
        category,
        content,
        imgUrls,
        hashtag: removeWhiteSpace.match(/#[ㄱ-ㅎ가-힣a-zA-Z0-9]+/g),
        geoLocation,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
};
export default feedAPI;
