import { useEffect } from "react";
import * as S from "./EntireLoading.styles";
import { atom, useRecoilValue } from "recoil";

// eslint-disable-next-line react-refresh/only-export-components
export const loadingAtom = atom<boolean>({
  key: "isLoading",
  default: false,
});

export default function EntireLoading() {
  const isEntireLoading = useRecoilValue(loadingAtom);

  console.log(loadingAtom.key);
  // 스크롤 금지
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      document.body.style.cssText = `position: ${
        originalOverflow ? "fixed" : "static"
      };`;
      window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
    };
  });

  return isEntireLoading ? (
    <S.Overlay>
      <S.Container>
        <S.Spinner src="../disk.png" />
        <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
      </S.Container>
    </S.Overlay>
  ) : null;
}
