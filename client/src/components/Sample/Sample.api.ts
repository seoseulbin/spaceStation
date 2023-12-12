// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import axios from "axios";
import { SampleType } from "./Sample.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/samples`,
});

const sampleAPI = {
  async getSamples() {
    const res = await instance.get<SampleType[]>(`/`);
    return res.data;
  },

  async postSample(props: { content: SampleType["content"] }) {
    return instance.post(`/`, props);
  },
};

export default sampleAPI;
