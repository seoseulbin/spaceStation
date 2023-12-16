import { Schema, Types, model } from "mongoose";

type CategorySchemaType = {
  _id: Types.ObjectId;
  category: string;
};

const CategorySchema = new Schema<CategorySchemaType>({
  category: {
    type: String,
    required: true,
  },
});

const CategoryModel = model("category", CategorySchema);

export default CategoryModel;
