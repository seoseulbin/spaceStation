import styled from "styled-components";

export default function SocialLogin() {

  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth`;
  //console.log(REST_API_KEY, REDIRECT_URI);
  const authorizeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;
  
  return (
    <>
      <KakaoLoginButton href={authorizeURL}>카카오 계정으로 로그인</KakaoLoginButton>
    </>
  );
}

const KakaoLoginButton = styled.a`
  background-color: #fde433;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  width: 70%;
  font-size: ${({ theme }) => theme.size.lg}px;
  padding: ${({ theme }) => theme.size.md}px ${({ theme }) => theme.size.lg}px;
`