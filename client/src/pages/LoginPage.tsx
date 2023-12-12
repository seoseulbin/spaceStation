import styled from "styled-components";
import SocialLogin from "@/components/Button/SocialLogin/SocialLogin";

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
  align-items: center;
  justify-content: center;
`;
