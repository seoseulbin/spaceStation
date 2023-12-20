import * as S from "./ImageAnchorButton.styles";

export default function ImageAnchorTagButton({
  x,
  y,
  onClick,
}: {
  x: number;
  y: number;
  onClick: (e: React.BaseSyntheticEvent) => void;
}) {
  return <S.AnchorButton x={x} y={y} onClick={onClick}></S.AnchorButton>;
}
