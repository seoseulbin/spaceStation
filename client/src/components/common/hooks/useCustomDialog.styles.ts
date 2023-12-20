// import { theme } from "@/global/styles/theme";
import { styled } from "styled-components";
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
  position: relative;
  border-radius: 8px;
`;

export const BasicModalLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  & h1 {
    font-size: 2em;
    font-weight: bold;
  }
  & p {
    font-size: 1em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  & button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    outline: none;
    border: none;
    padding: 4px 6px;
    border-radius: 8px;
  }
`;
