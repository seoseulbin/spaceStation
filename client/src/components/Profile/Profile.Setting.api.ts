import { axiosInstance } from "../../global/axiosInstance";

const profileSettingAPI = {
  logout: async () => {
    const data = {};
    const response = await axiosInstance.post("/auth/logout", data, {
      withCredentials: true,
    });
    return response;
  },
  withdraw: async () => {
    const data = {};
    const response = await axiosInstance.post("/auth/withdraw", data, {
      withCredentials: true,
    });
    return response;
  },
};
export default profileSettingAPI;
