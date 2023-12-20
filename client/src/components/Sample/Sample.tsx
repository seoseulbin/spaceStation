// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { useState } from "react";
import Loading from "../common/Loading";
import { useSample } from "./Sample.hooks";
import SampleItem from "./SampleItem";
import Modal from "styled-react-modal";

export default function Sample() {
  const { samples, postSample, isLoading, isError, error } = useSample();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return error.message;

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={toggleModal}>모달 호출하기</button>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
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
`;
