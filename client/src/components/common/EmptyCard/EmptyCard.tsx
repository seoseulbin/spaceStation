import * as S from "./EmptyCard.styles";

export default function EmptyCard({ type }: { type: string }) {
  return (
    <S.EmptyCardContainer>
      {type === "USER" && <img src="/nouser.png" alt={type} />}
      {type === "COMMENT" && <img src="/nocomment.png" alt={type} />}
      {type === "FEED" && <img src="/nofeed.png" alt={type} />}
    </S.EmptyCardContainer>
  );
}
