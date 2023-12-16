import * as S from "./AnchorButton.styles.ts";

export default function AnchorButton({
  label,
  url,
  bgcolor,
  textcolor,
  onClick,
}: {
  label: string;
  url: string | undefined;
  bgcolor: string;
  textcolor: string;
  onClick: () => void;
}) {
  return (
    <>
      <S.AnchorButton
        href={url}
        onClick={onClick}
        bgcolor={bgcolor}
        textcolor={textcolor}
      >
        {label}
      </S.AnchorButton>
    </>
  );
}
