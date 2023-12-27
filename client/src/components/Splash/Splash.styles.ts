/* SplashScreen.css */
import styled, { keyframes } from "styled-components";

const bigger = keyframes`
from {
  transform: scale(1.0);
  opacity : 1;
} 
to {
  transform: scale(2.5);
  opacity : 0;
}
`;

export const SplashContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${bigger} 1s 1.1s ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 스플래시 화면을 항상 위에 표시하기 위한 z-index 설정 */
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const open = keyframes`
from{
    transform: rotateY(0deg);
}
to{
    transform: rotateY(-160deg);
}
`;

export const SpinDisk = styled.img`
  justify-content: center;
  top: 1vh;
  animation: ${rotate} 0.7s 0.1s ease-out;
  height: 45vh;
  position: fixed;
`;

export const Door = styled.img`
  bottom: 7vh;
  position: fixed;
  height: 68vh;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.2);
  transform-origin: left;
  perspective: 1000px;
  transition: 0.5s;

  animation: ${open} 1s 1s ease-out;
`;

export const DoorFrame = styled.img`
  justify-content: center;
  height: 90vh;
  position: fixed;
`;
