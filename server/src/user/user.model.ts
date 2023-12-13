import { Schema, Types, model } from "mongoose";

type UserSchemaType = {
  _id: Types.ObjectId;
  nickname: string;
  snsId: string;
  profileImgUrl: string;
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
  }
});

const UserModel = model("user", UserSchema);

export default UserModel;
