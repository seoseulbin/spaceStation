import { Router } from "express";
import likeController from "./like.controller";

const likeRouter = Router();

likeRouter.get("/");
likeRouter.post("/");
likeRouter.delete("/");

export default likeRouter;
