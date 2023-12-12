// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import sampleService from "./sample.service.js";

const sampleController = {
  getSamples: asyncHandler(async (_, res) => {
    const samples = await sampleService.getSamples();
    res.json(samples);
  }),

  postSample: asyncHandler(
    async (req: Request<{}, {}, { content: string }>, res) => {
      const { content } = req.body;
      if (!content)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      sampleService.postSample({ content });
      res.status(200).end();
    },
  ),
};

export default sampleController;
