import { Router } from "express";
import followController from "./follow.controller.js";

const followRouter = Router();

// followRouter.get("/",isAuth ,followController.getFollows);
// followRouter.post("/",isAuth,followController.postFollow);
// followRouter.delete("/:followid",isAuth,followController.deleteFollow);

//followRouter.get("/", followController.getFollows);
followRouter.get("/:userid", followController.getFollows);

followRouter.post("/", followController.postFollow);
followRouter.delete("/:follower", followController.deleteFollow);

export default followRouter;
