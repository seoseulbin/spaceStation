// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import * as S from "./Sample.styles";
import { SampleType } from "./Sample.type";

export default function SampleItem({ item }: { item: SampleType }) {
  return (
    <>
      <S.Container>{item.age}</S.Container>
    </>
  );
}
