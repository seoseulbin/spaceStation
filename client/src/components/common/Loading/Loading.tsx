import * as S from "./Loading.styles";

// TODO: 스타일링
export function Loading() {
  return (
    <>
      <S.Spinner />
      <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
    </>
  );
}
