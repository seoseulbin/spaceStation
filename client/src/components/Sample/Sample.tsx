// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { useState } from "react";
import Loading from "../common/Loading";
import { useSample } from "./Sample.hooks";
import SampleItem from "./SampleItem";
import Modal from "styled-react-modal";

export default function Sample() {
  const { samples, postSample, isLoading, isError, error } = useSample();

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  if (isLoading) return <Loading />;
  if (isError) return error.message;

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
      <button
        onClick={async () => {
          const res = await postSample({ content: "ㅁ" });
          console.log(res);
        }}
      >
        post sample
      </button>
      {samples!.map((sample) => (
        <SampleItem key={sample._id} item={sample} />
      ))}
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
