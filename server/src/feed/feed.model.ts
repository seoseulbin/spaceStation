import { Schema, Types, model } from "mongoose";

type FeedSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  comments: Array<Types.ObjectId>;
  category: Types.ObjectId;
  imgUrls: Array<string>;
  content: string;
  createdAt: Date;
  // TODO: 위치 정보 사용시 활성화
  // geoLocation: Array<Types.ObjectId>
};

const FeedSchema = new Schema<FeedSchemaType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    imgUrls: {
      type: [String],
      default: [],
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

const FeedModel = model("feed", FeedSchema);

export default FeedModel;
