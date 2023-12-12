// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import SampleModel from "./sample.model.js";

const sampleService = {
  async getSamples() {
    return SampleModel.find({});
  },

  async postSample({ content }: { content: string }) {
    return SampleModel.create({ content });
  },
};

export default sampleService;
