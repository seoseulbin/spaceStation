import { Router } from "express";
import parseController from "./parse.controller.js";

const parseRouter = Router();

parseRouter.get("/", parseController.getOGdata);

export default parseRouter;
