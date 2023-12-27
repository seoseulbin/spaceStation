import { axiosInstance } from "@/global/axiosInstance";
import { UpdateFeedType } from "./UpdateFeed.type";

const feedAPI = {
  getFeed: async (_id: string) => {
    const response = await axiosInstance.get<UpdateFeedType>(`/feeds/${_id}`);
    return response.data;
  },

  updateFeed: async ({
    _id,
    category,
    content,
    imgUrls,
    geoLocation,
  }: UpdateFeedType) => {
    const response = await axiosInstance.put(
      `/feeds/${_id}`,
      {
        category,
        content,
        imgUrls,
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
