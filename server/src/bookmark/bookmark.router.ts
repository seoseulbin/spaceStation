import { Router } from "express";
import bookmarkController from "./bookmark.controller.js";

const bookMarkRouter = Router();

bookMarkRouter.get("/:feedId", bookmarkController.getBookmarksByFeedId);
bookMarkRouter.get("/mine", bookmarkController.getBookmarksMine);
bookMarkRouter.post("/", bookmarkController.postBookmark);
bookMarkRouter.delete("/:feedId", bookmarkController.deleteBookmark);

export default bookMarkRouter;
