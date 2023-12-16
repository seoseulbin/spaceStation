import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import sampleRouter from "./sample/sample.router.js";
import errorHandler from "./middleware/errorHandler.js";
import feedRouter from "./feed/feed.router.js";
import categoryRouter from "./category/category.router.js";

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
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);

app.use("/api/samples", sampleRouter);
app.use("/api/feeds", feedRouter);
app.use("/api/categorys", categoryRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT:${PORT}`);
});
