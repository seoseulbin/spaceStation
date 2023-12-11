// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { useSample } from "./Sample.hooks";
import SampleItem from "./SampleItem";

export default function Sample() {
  const { samples, isLoading, isError, error } = useSample();

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      {samples!.map((sample) => (
        <SampleItem key={sample.id} item={sample} />
      ))}
    </>
  );
}
