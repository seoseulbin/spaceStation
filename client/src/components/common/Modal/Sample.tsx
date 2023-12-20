// TODO: 모달 사용을 위한 샘플 파일. 커스텀 훅으로 변환할 예정
import { useState } from "react";
import Modal from "styled-react-modal";

export default function Sample() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setIsOpen(!isOpen);
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
      <button onClick={toggleModal}>모달 호출하기</button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal!</span>
        <button onClick={toggleModal}>모달 닫기</button>
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
