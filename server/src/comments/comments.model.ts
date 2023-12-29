import { Schema, Types, model } from "mongoose";

type CommentSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  feedId: Types.ObjectId;
  content: string;
  createdAt: Date;
  parentCommentId: Types.ObjectId | null;
};

const CommentSchema = new Schema<CommentSchemaType>(
  {
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
    content: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = model("comment", CommentSchema);

export default CommentModel;
