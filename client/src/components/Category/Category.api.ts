import axios from "axios";
import { CategoryType } from "./Category.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/categorys`,
});

const categoryAPI = {
  async getCategory() {
    const res = await instance.get<CategoryType[]>(`/`);
    return res.data;
  },
};
export default categoryAPI;
