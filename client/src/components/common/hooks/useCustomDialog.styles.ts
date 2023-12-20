import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
    width: 20rem;
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    opacity: ${(props: { opacity: number }) => props.opacity};
    transition : all 0.3s ease-in-out;
  `;
