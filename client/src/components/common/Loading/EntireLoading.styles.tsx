import styled, { keyframes } from "styled-components";

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.background};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.img`
  margin: 0 auto;
  width: 16vw;
  height: 16vw;
  border-radius: 100%;
  animation: ${spin} 1s ease-in-out infinite;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Container = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  gap: 15px;
`;
