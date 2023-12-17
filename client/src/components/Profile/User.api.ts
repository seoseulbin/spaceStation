import axios from "axios";
import { UserType } from "./User.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
});

const followAPI = {
  async getUser(userid: string) {
    const res = await instance.get<UserType>(`/${userid}`);
    return res.data;
  },

  async putUser(props: {
    nickname: UserType["nickname"];
    profileImgUrl: UserType["profileImgUrl"];
  }) {
    return instance.put(`/`, props, {
      withCredentials: true,
    });
  },
};

export default followAPI;
