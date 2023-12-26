import styled, { keyframes } from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const LoadingText = styled.p`
  color: white;
  position: fixed;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const RotateLolletWrapper = styled.div`
  position: fixed;
  width: 350px;
  height: 350px;
  top: 150px;
  border-radius: 50%;
  background-color: transparent;
  animation: ${rotate} 2s linear infinite;
  overflow: hidden;
`;

export const RotateLolletSection = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 100% 0%, 100% 100%);
  background-color: ${(props) => props.color};
`;

export const Rect = styled.div`
  position: fixed;
  width: 400px;
  height: 750px;
  top: 320px;
  background-color: brown;
`;
