import { axiosInstance } from "@/global/axiosInstance";

const parseAPI = {
  async getURLMetaData(url: string) {
    const response = await axiosInstance.get(`/parse?url=${url}`);
    return response;
  },
};

export default parseAPI;
