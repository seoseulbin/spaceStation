import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100vh;
  display: flex;
  min-height: 360px;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 90%;

  & a {
    display: flex;
    white-space: nowrap;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    background-color: #fee638;
    font-size: 1.2em;
  }

  & img {
    width: 36px;
    left: 10px;
    position: absolute;
    top: 8px;
    pointer-events: none;
  }
`;

export const ImageContainer = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  text-align: center;

  & img {
    width: 184px;
  }

  & h3 {
    font-size: ${({ theme }) => theme.size.lg}px;
    line-height: 1.3;
  }
`;
