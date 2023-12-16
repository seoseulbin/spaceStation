import * as S from "./Login.styles";
import toast from "react-hot-toast";
import AnchorButton from "@/components/common/AnchorButton/AnchorButton";
import { theme } from "../../global/styles/theme";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

export default function Login() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth`;
  const authorizeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const logoutURL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`;
  const withdrawURL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/withdraw`;
  const subColor = theme.colors.sub;

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentNickname, setCurrentNickname] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const localUserData = localStorage.getItem("currentUser");
    const id = searchParams.get("id");
    const nickname = searchParams.get("nickname");

    if (localUserData != null) {
      const currentUser = JSON.parse(localUserData as string);
      setCurrentUserId(currentUser.userId);
      setCurrentNickname(currentUser.nickname);
    }
    if (id && nickname) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          userId: id,
          nickname: nickname,
        }),
      );
      setCurrentUserId(id as string);
      setCurrentNickname(nickname as string);
    }

    if (currentNickname) {
      toast.success(
        `"${currentNickname}(${currentUserId.slice(
          0,
          5,
        )}...)"(으)로 로그인 했습니다.`,
      );
    }
    navigate(location.pathname);
  }, [
    location.pathname,
    currentUserId,
    searchParams,
    navigate,
    currentNickname,
  ]);

  function handleWithdraw() {
    const data = {};
    axios
      .post(withdrawURL, data, {
        withCredentials: true,
      })
      .then((response) => {
        setCurrentUserId("");
        setCurrentNickname("");
        toast.success(response.data.message);
        delete localStorage.currentUser;
      });
  }

  function handleLogout() {
    const data = {};
    axios
      .post(logoutURL, data, {
        withCredentials: true,
      })
      .then(() => {
        setCurrentUserId("");
        setCurrentNickname("");
        toast.success("로그아웃 되었습니다.");
        delete localStorage.currentUser;
      });
  }

  return (
    <S.Container>
      {!localStorage.getItem("currentUser") && (
        <AnchorButton
          bgcolor="#fde433"
          textcolor="#333"
          url={authorizeURL}
          onClick={() => {}}
          label="카카오 계정으로 로그인"
        />
      )}
      {localStorage.getItem("currentUser") && (
        <>
          <AnchorButton
            bgcolor={subColor}
            textcolor="#FFF"
            url={undefined}
            onClick={handleLogout}
            label="로그아웃 버튼"
          />
          <AnchorButton
            bgcolor="red"
            textcolor="#FFF"
            onClick={handleWithdraw}
            url={undefined}
            label="회원탈퇴 버튼"
          />
        </>
      )}
    </S.Container>
  );
}
