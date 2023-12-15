import styled from "styled-components";
import SocialLogin from "@/components/Button/SocialLogin/SocialLogin";
//import axios from "axios";

export default function LoginPage() {
  return (
    <Container>
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
