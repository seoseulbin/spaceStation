import { Schema, Types, model } from "mongoose";

type UserSchemaType = {
  _id: Types.ObjectId;
  nickname: string;
  snsId: string;
  profileImgUrl: string;
  deletedAt: Date | null;
};

const UserSchema = new Schema<UserSchemaType>({
  nickname: {
    required: true,
    type: String,
  },
  snsId: {
    required: true,
    type: String,
  },
  profileImgUrl: {
    required: true,
    type: String,
  },
  deletedAt: {
    default: null,
    type: Date,
  },
});

const UserModel = model("user", UserSchema);

export default UserModel;
