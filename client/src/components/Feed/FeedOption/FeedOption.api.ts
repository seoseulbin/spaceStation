import { axiosInstance } from "@/global/axiosInstance";

const feedAPI = {
  deleteFeed: async (_id: string) => {
    try {
      const response = await axiosInstance.delete(`/feeds/${_id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  },
};
export default feedAPI;
