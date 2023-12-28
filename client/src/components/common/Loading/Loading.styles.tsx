import styled, { keyframes } from "styled-components";

export const LoadingText = styled.p`
  color: black;
  position: fixed;

  top: 50%;
  left: 46%;
  width: 100%;
  height: 100%;

  z-index: -1;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.img`
  margin: calc(50% - 25px) auto;
  display: block;
  width: 20vw;
  height: 20vw;
  animation: ${spin} 1s ease-in-out infinite;
`;
