import * as S from "./Loading.styles";

const colors = [
  "#F764D9",
  "#A452DE",
  "#FFA000",
  "#ffff00",
  "#F764D9",
  "#A452DE",
  "#FFA000",
  "#ffff00",
];

// TODO: 스타일링
export default function Loading() {
  return (
    <>
      <S.Background>
        <S.RotateLolletWrapper>
          {colors.map((color, index) => (
            <S.RotateLolletSection
              key={index}
              color={color}
              style={{ transform: `rotate(${45 * index}deg)` }}
            />
          ))}
        </S.RotateLolletWrapper>
        <S.Rect />
        <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
      </S.Background>
    </>
  );
}
