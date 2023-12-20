import asyncHandler from "../middleware/asyncHandler.js";
import categoryService from "./category.service.js";

const CategoryController = {
  getCategorys: asyncHandler(async (_, res) => {
    const categorys = await categoryService.getCategorys();
    res.json(categorys);
  }),
};

export default CategoryController;
