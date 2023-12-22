import * as S from "./Login.styles";
import toast from "react-hot-toast";
import AnchorButton from "@/components/common/AnchorButton/AnchorButton";

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { storage, storageKeys } from "../../global/storage";
import { PATH } from "@/global/constants";

export default function Login() {
  const kakaoAuthorizeURL = `${
    import.meta.env.VITE_BACKEND_URL
  }/api/auth/kakao`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUserId, setCurrentUserId] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");

  useEffect(() => {
    const pathname = location.pathname;
    const localUserData = storage.get(storageKeys.currentUser);
    const id = searchParams.get("id");
    const nickname = searchParams.get("nickname");

    if (localUserData != null) {
      const currentUser = JSON.parse(localUserData as string);
      setCurrentUserId(currentUser.userId);
      setCurrentNickname(currentUser.nickname);
    }
    if (id && nickname) {
      storage.set(
        storageKeys.currentUser,
        JSON.stringify({
          userId: id,
          nickname: nickname,
        }),
      );
    }

    if (currentNickname && currentUserId && pathname === "/login") {
      toast.success(
        `"${currentNickname}(${currentUserId.slice(
          0,
          5,
        )}...)"(으)로 로그인 했습니다.`,
      );
      navigate(PATH.profile);
    }
  }, [
    searchParams,
    navigate,
    currentNickname,
    currentUserId,
    location.pathname,
  ]);

  return (
    <S.Container>
      {!searchParams.get("id") && (
        <>
          <div>로그인 페이지</div>
          <AnchorButton
            bgcolor="#fde433"
            textcolor="#333"
            href={kakaoAuthorizeURL}
            onClick={() => {}}
            children="카카오 계정으로 로그인"
          />
        </>
      )}
    </S.Container>
  );
}
