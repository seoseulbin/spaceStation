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

export const Spinner = styled.div`
  margin: calc(50% - 25px) auto;
  width: 50px;
  height: 50px;
  border: 7px solid rgba(0, 0, 0, 1);
  box-sizing: border-box;

  border-top-color: white;
  border-bottom-color: white;

  border-radius: 100%;
  animation: ${spin} 1s ease-in-out infinite; // Use the keyframes variable here
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
