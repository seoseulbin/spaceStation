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

  async getSearchUsers(props: {
    query: string;
    cursor: number;
    limit: number;
  }) {
    const { query, cursor, limit } = props;
    const { data } = await axiosInstance.get<UserType[]>(
      `/users/search/${query}?cursor=${cursor}&limit=${limit}`,
    );

    return { data, nextCursor: cursor + limit };
  },
};

export default userAPI;
