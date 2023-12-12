// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { Router } from "express";
import sampleController from "./sample.controller.js";

const sampleRouter = Router();

sampleRouter.get("/", sampleController.getSamples);
sampleRouter.post("/", sampleController.postSample);

export default sampleRouter;
