import { Schema, Types, model } from "mongoose";

type BookmarkSchemaType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  feedId: Types.ObjectId;
};

const BookmarkSchema = new Schema<BookmarkSchemaType>({
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

const BookmarkModel = model("bookmarks", BookmarkSchema);

export default BookmarkModel;
