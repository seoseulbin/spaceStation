import * as S from "./ImageAnchorButton.styles";

export default function ImageAnchorTagButton({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return <S.AnchorButton x={x} y={y}></S.AnchorButton>;
}
