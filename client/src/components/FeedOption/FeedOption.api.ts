import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/feeds`,
});

const feedAPI = {
  deleteFeed: async (_id: string) => {
    try {
      const response = await instance.delete(`/${_id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  },
};
export default feedAPI;
