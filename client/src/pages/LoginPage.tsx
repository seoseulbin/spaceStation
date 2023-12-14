import styled from "styled-components";
import SocialLogin from "@/components/Button/SocialLogin/SocialLogin";
import Auth from "@/components/Auth/Auth";
import { useLocation } from 'react-router-dom';

export default function LoginPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authType: string | null = searchParams.get('oauth');
  return (
    <Container>
      {!authType && <SocialLogin />}
      {authType && <Auth />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
