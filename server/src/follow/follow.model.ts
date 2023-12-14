import { Schema, Types, model } from "mongoose";

type FollowSchemaType = {
  _id: Types.ObjectId;
  following: Types.ObjectId;
  follower: Types.ObjectId;
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
});

const FollowModel = model("follow", FollowSchema);

export default FollowModel;
