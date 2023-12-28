import * as S from "./EntireLoading.styles";
import { atom, useRecoilValue } from "recoil";

// eslint-disable-next-line react-refresh/only-export-components
export const loadingAtom = atom<boolean>({
  key: "isLoading",
  default: false,
});

export default function EntireLoading() {
  const isEntireLoading = useRecoilValue(loadingAtom);

  return isEntireLoading ? (
    <S.Overlay>
      <S.Container>
        <S.Spinner src="/disk.png" />
      </S.Container>
    </S.Overlay>
  ) : null;
}
