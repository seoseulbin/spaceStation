import * as S from "./AnchorButton.styles.ts";

export default function AnchorButton({
  label,
  url,
  bgColor,
  textColor,
}: {
  label: string;
  url: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <>
      <S.AnchorButton href={url} bgColor={bgColor} textColor={textColor}>
        {label}
      </S.AnchorButton>
    </>
  );
}
