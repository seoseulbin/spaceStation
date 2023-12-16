import CategoryModel from "./category.model.js";

const categoryService = {
  async getCategorys() {
    return CategoryModel.find({});
  },
};

export default categoryService;
