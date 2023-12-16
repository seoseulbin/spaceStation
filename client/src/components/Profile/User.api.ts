import axios from "axios";
import { UserType } from "./User.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
});

// 특정 쿠키의 값을 가져오기
const getCookieValue = (cookieName: string) => {
  const cookies = document.cookie;
  const cookieParts = cookies.split("; ");

  for (const cookie of cookieParts) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }

  return null;
};

const authTokenValue = getCookieValue("service_token");

const followAPI = {
  async getUser(userid: string) {
    const res = await instance.get<UserType>(`/${userid}`);
    return res.data;
  },

  async putUser(props: {
    nickname: UserType["nickname"];
    profileImgUrl: UserType["profileImgUrl"];
  }) {
    const headers = {
      Authorization: `Bearer ${authTokenValue}`,
    };
    return instance.post(`/`, props, { headers });
  },
};

export default followAPI;
