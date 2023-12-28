import { PATH } from "@/global/constants";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StylesdLayout = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.deepback};
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;

  & button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    font-size: ${({ theme }) => theme.size.md}px;
    padding: ${({ theme }) => theme.size.rg}px ${({ theme }) => theme.size.lg}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
    line-height: 1;

    border: 1px solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
    background-color: transparent;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const NotFoundImg = styled.img`
  width: 25vw;
  position: relative;
  max-width: 180px;
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  function returnToMain() {
    navigate(PATH.root);
  }

  return (
    <>
      <StylesdLayout>
        <NotFoundImg src="../notfound.png" />
        <button onClick={() => returnToMain()}>메인으로 이동</button>
      </StylesdLayout>
    </>
  );
}
