import * as S from "./AnchorButton.styles.ts";
import { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLButtonElement> & {
  children?: string;
  href?: string | undefined;
  bgcolor: string;
  textcolor: string;
  onClick: () => void;
};
export default function AnchorButton({
  children,
  href,
  bgcolor,
  textcolor,
  onClick,
}: ButtonProps) {
  return (
    <>
      <S.AnchorButton
        href={href}
        onClick={onClick}
        bgcolor={bgcolor}
        textcolor={textcolor}
      >
        {children}
      </S.AnchorButton>
    </>
  );
}
