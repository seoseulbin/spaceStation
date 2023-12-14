import { Schema, Types, model } from "mongoose";

type CommentSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  feedId: Types.ObjectId;
  content: string;
  createdAt: Date;
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
  },
  {
    timestamps: true,
  },
);

const CommentModel = model("comment", CommentSchema);

export default CommentModel;
