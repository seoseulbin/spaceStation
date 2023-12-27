import { Schema, Types, model } from "mongoose";

type FeedSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  comments: Array<Types.ObjectId>;
  category: Types.ObjectId;
  imgUrls: Array<{
    url: string;
    tagPosition: Array<{ x: number; y: number }>;
    tagInfo: Array<{ name: string; url: string }>;
  }>;
  content: string;
  createdAt: Date;
  geoLocation: {
    content: string;
    position: {
      lat: number;
      lng: number;
    };
  };
};

const FeedSchema = new Schema<FeedSchemaType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comment",
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    imgUrls: {
      type: [],
      default: [],
    },
    content: {
      type: String,
      required: true,
    },
    geoLocation: {
      type: {
        content: String,
        position: {},
      },
    },
  },
  {
    timestamps: true,
  },
);

const FeedModel = model("feed", FeedSchema);

export default FeedModel;
