import { UserType } from "./User.type";
import { axiosInstance } from "@/global/axiosInstance";

const userAPI = {
  async getUser(userid: string) {
    const res = await axiosInstance.get<UserType>(`/users/${userid}`);
    return res.data;
  },

  async putUser(props: {
    nickname: UserType["nickname"];
    profileImgUrl: UserType["profileImgUrl"];
  }) {
    return axiosInstance.put(`/users/`, props, {
      withCredentials: true,
    });
  },
};

export default userAPI;
