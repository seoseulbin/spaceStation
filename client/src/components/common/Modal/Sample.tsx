// TODO: 모달 사용을 위한 샘플 파일. 커스텀 훅으로 변환할 예정
import { useState } from "react";
import Modal from "styled-react-modal";

export default function Sample() {
  const [isAOpen, setIsAOpen] = useState(false);
  const [isBOpen, setIsBOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModalA() {
    setIsAOpen(!isAOpen);
  }
  function toggleModalB() {
    setIsBOpen(!isBOpen);
  }
  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <>
      <button onClick={toggleModalA}>모달 A 호출하기</button>
      <button onClick={toggleModalB}>모달 B 호출하기</button>
      <StyledModal
        isOpen={isAOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModalA}
        onEscapeKeydown={toggleModalA}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal A!</span>
        <button onClick={toggleModalA}>모달 닫기</button>
      </StyledModal>
      <StyledModal
        isOpen={isBOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModalB}
        onEscapeKeydown={toggleModalB}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal B!</span>
        <button onClick={toggleModalB}>모달 닫기</button>
      </StyledModal>
    </>
  );
}

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition : all 0.3s ease-in-out;
`;
