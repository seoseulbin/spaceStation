import * as S from "./EmptyCard.styles";

export default function EmptyCard({ type }: { type: string }) {
  return (
    <S.EmptyCardContainer>
      <img src="/nofeed.png" alt={type} />
    </S.EmptyCardContainer>
  );
}
