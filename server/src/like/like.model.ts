import { Schema, Types, model } from "mongoose";

type LikeSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  feedId: Types.ObjectId;
};

const LikeSchema = new Schema<LikeSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  feedId: {
    type: Schema.Types.ObjectId,
    ref: "feed",
    required: true,
  },
});

const LikeModel = model("like", LikeSchema);

export default LikeModel;
