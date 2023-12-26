import { Router } from "express";
import bookmarkController from "./bookmark.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const bookMarkRouter = Router();

bookMarkRouter.get("/:feedId", bookmarkController.getBookmarksByFeedId);
bookMarkRouter.post("/", validateToken, bookmarkController.postBookmark);
bookMarkRouter.delete(
  "/:feedId",
  validateToken,
  bookmarkController.deleteBookmark,
);

export default bookMarkRouter;
