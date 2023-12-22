import { Router } from "express";
import bookmarkController from "./bookmark.controller";

const bookMarkRouter = Router();

bookMarkRouter.get("/", bookmarkController.getBookmarksByUserId);
bookMarkRouter.post("/", bookmarkController.postBookmark);
bookMarkRouter.delete("/:feedId", bookmarkController.deleteBookmark);

export default bookMarkRouter;
