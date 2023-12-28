import { Schema, Types, model } from "mongoose";

type LikeSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  commentId: Types.ObjectId;
};

const LikeSchema = new Schema<LikeSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "comment",
    required: true,
  },
});

const CommentLikeModel = model("commentLikes", LikeSchema);

export default CommentLikeModel;
