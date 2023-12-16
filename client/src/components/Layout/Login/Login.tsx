import * as S from "./Login.styles";
import toast from "react-hot-toast";
import AnchorButton from "@/components/Button/AnchorButton/AnchorButton";
import { theme } from "../../../global/styles/theme";
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

  const [nickname, setNickname] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    const nickname = searchParams.get("nickname");
    setCurrentUserId(id as string);
    setNickname(nickname as string);
    navigate(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nickname) {
      toast.success(
        `"${nickname}(${currentUserId.slice(0, 5)}...)"(으)로 로그인 했습니다.`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  function handleWithdraw() {
    const data = {};
    axios
      .post(withdrawURL, data, {
        withCredentials: true,
      })
      .then((response) => {
        setCurrentUserId("");
        setNickname("");
        toast.success(response.data.message);
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
        setNickname("");
        toast.success("로그아웃 되었습니다.");
      });
  }

  return (
    <S.Container>
      {!currentUserId && (
        <AnchorButton
          bgcolor="#fde433"
          textcolor="#333"
          url={authorizeURL}
          onClick={() => {}}
          label="카카오 계정으로 로그인"
        />
      )}
      {currentUserId && (
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
