import { Router } from "express";
import followController from "./follow.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const followRouter = Router();

//followRouter.get("/", followController.getFollows);
followRouter.get("/:userid", followController.getFollows);
followRouter.get("/follower/:userid", followController.getFollowers);
followRouter.get("/following/:userid", followController.getFollowings);
followRouter.post("/", followController.postFollow);
followRouter.delete("/:follower", validateToken, followController.deleteFollow);

export default followRouter;
