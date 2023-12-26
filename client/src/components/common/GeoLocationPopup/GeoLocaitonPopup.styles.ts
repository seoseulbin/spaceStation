import Modal from "styled-react-modal";

export const BottomSheet = Modal.styled`
  width: 500px;
  max-width: 90vw;
  height: 480px;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  opacity: ${(props: { opacity: number }) => props.opacity};
  -webkit-transform: scale(${(props: { opacity: number }) =>
    props.opacity === 0 ? 1.05 : 1});
  transform: scale(${(props: { opacity: number }) =>
    props.opacity === 0 ? 1.05 : 1});
  -webkit-transition : all 0.375s 0.025s cubic-bezier(0.67, 0.03, 0.29, 1.13);
  transition : all 0.375s 0.025s cubic-bezier(0.67, 0.03, 0.29, 1.13);
  position: relative;
  border-radius: 8px;
`;
