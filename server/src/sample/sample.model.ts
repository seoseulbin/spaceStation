// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { Schema, Types, model } from "mongoose";

type SampleSchemaType = {
  _id: Types.ObjectId;
  content: string;
};

const SampleSchema = new Schema<SampleSchemaType>({
  content: {
    type: String,
  },
});

const SampleModel = model("sample", SampleSchema);

export default SampleModel;
