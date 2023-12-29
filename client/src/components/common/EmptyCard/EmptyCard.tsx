import * as S from "./EmptyCard.styles";

export default function EmptyCard({ type }: { type: string }) {
  const emptyImageLink = type === "USER" ? "/nouser.png" : "/nofeed.png";

  return (
    <S.EmptyCardContainer>
      <img src={emptyImageLink} alt={type} />
    </S.EmptyCardContainer>
  );
}
