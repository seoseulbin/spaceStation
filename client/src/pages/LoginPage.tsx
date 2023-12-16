import styled from "styled-components";
import AnchorButton from "@/components/Button/AnchorButton/AnchorButton";
import { theme } from "../global/styles/theme";

export default function LoginPage() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth`;
  const authorizeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const mainColor = theme.colors.main;

  return (
    <Container>
      <AnchorButton
        bgColor="#fde433"
        textColor="#333"
        url={authorizeURL}
        label="카카오 계정으로 로그인"
      />
      <AnchorButton
        bgColor={mainColor}
        textColor="#FFF"
        url={"#"}
        label="테스트 버튼"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
