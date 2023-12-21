import { axiosInstance } from "@/global/axiosInstance";
import { CategoryType } from "./Category.type";

const categoryAPI = {
  async getCategory() {
    const res = await axiosInstance.get<CategoryType[]>(`/categorys`);
    return res.data;
  },
};
export default categoryAPI;
