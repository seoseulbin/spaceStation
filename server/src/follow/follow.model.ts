import { Schema, Types, model } from "mongoose";

type FollowSchemaType = {
  _id: Types.ObjectId;
  following: Types.ObjectId;
  follower: Types.ObjectId;
  deletedAt: Date | null;
};

const FollowSchema = new Schema<FollowSchemaType>({
  following: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deletedAt: {
    default: null,
    type: Date,
  },
});

const FollowModel = model("follow", FollowSchema);

export default FollowModel;
