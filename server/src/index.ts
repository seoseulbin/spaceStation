import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import sampleRouter from "./sample/sample.router.js";
import errorHandler from "./middleware/errorHandler.js";
import feedRouter from "./feed/feed.router.js";
import likeRouter from "./like/like.router.js";
import cookieParser from "cookie-parser";

const { PORT, MONGODB_URL, FRONTEND_URL } = process.env;
if (!PORT || !MONGODB_URL || !FRONTEND_URL) {
  console.error("no env var");
  process.exit();
}

mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);

app.use("/api/samples", sampleRouter);
app
  .use("/api/feeds", feedRouter) //
  .use("/api/likes", likeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT:${PORT}`);
});
