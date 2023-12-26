import * as S from "./Login.styles";
import AnchorButton from "@/components/common/AnchorButton/AnchorButton";
import { useSearchParams, useLocation, Navigate } from "react-router-dom";
import { storage, storageKeys } from "../../global/storage";
import { PATH } from "@/global/constants";

const kakaoAuthorizeURL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao`;

/**
 * 카카오 로그인 성공 시 /login?id={userId}&nickname={nickname} 으로 리다이렉팅됨
 * query parameter에 id와 nickname이 있다면 리다이렉팅된 상태이므로 로그인 요청 직전 페이지 혹은 메인페이지로 이동
 */
export default function Login() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const id = searchParams.get("id");
  const nickname = searchParams.get("nickname");

  if (id && nickname) {
    storage.set(storageKeys.currentUser, {
      userId: id,
      nickname: nickname,
    });
    return <Navigate to={location?.state?.from ?? PATH.root} />;
  }

  return (
    <S.Container>
      <AnchorButton
        bgcolor="#fde433"
        textcolor="#333"
        href={kakaoAuthorizeURL}
        onClick={() => {}}
        children="카카오 계정으로 로그인"
      />
    </S.Container>
  );
}
