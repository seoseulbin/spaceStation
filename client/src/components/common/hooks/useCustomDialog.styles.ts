import { theme } from "@/global/styles/theme";
import { styled } from "styled-components";
import Modal from "styled-react-modal";

export const BasicModal = Modal.styled`
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

export const BasicModalLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  & header {
    display: flex;
    padding: 0.5em 0.5em;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0 0 #ededed;

    & h1 {
      font-size: 1.35em;
      line-height: 1.5em;
      font-weight: bold;
      margin-left: 36px;
      flex-grow: 1;
      text-align: center;
    }

    & button {
      outline: none;
      border: none;
      padding: 4px 6px;
      border-radius: 8px;
      font-size: 0;
      height: 36px;
      width: 36px;
      cursor: pointer;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textSecondary};

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  & section {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    overflow-y: auto;
  }

  & p {
    font-size: 1em;
    line-height: 1.25em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ActionSheet = Modal.styled`
  width: 90vw;
  max-width: ${theme.size.maxWidth}px;
  height: auto;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props: { opacity: number }) => props.opacity};
  -webkit-transform: translateY(${(props: {
    opacity: number;
    length: number;
  }) => (props.opacity === 0 ? props.length * 60 : 0)}px);
  transform: translateY(${(props: { opacity: number; length: number }) =>
    props.opacity === 0 ? props.length * 60 : 0}px);
  -webkit-transition : all 0.35s 0.05s cubic-bezier(0.05, 0.92, 0.37, 1.12);
  transition : all 0.35s 0.05s cubic-bezier(0.05, 0.92, 0.37, 1.12);
  position: relative;
  align-self: flex-end;
  margin-bottom: 24px;

`;

export const ActionSheetLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 90vw;

  button {
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    max-width: ${({ theme }) => theme.size.maxWidth}px;
    font-size: ${({ theme }) => theme.size.lg}px;
    padding: ${({ theme }) => theme.size.md}px ${({ theme }) => theme.size.lg}px;

    &:hover {
      background-color: #f5f5f5;
    }

    &[name="NEUTRAL"] {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
    &[name="POSITIVE"] {
      color: ${({ theme }) => theme.colors.main};
    }
    &[name="ALERT"] {
      color: red;
    }
  }
`;

export const ConfirmPopup = Modal.styled`
  width: 400px;
  max-width: 90vw;
  height: auto;
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

export const ConfirmPopupLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & header {
    display: flex;
    padding: 1.5em 1em 1em;
    align-items: center;
    justify-content: center;

    & h3 {
      font-size: 1.15em;
      line-height: 1.25em;
      font-weight: bold;
      flex-grow: 1;
      text-align: center;
    }
  }
  & div {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size.lg}px;

    & section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      & label {
        font-size: ${({ theme }) => theme.size.sm}px;
      }

      & input {
        border-radius: 5px;
        border: none;
        outline: none;
        border: 1px solid #ededed;
        font-size: ${({ theme }) => theme.size.md}px;
        padding: ${({ theme }) => theme.size.sm}px
          ${({ theme }) => theme.size.rg}px;

        &:focus {
          border-color: ${({ theme }) => theme.colors.main};
        }
      }
    }
  }
  & footer {
    display: flex;
    padding: 1em 1.25em 1.5em;
    align-items: center;
    justify-content: center;
    gap: 0.75em;

    & button {
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      text-align: center;
      font-size: ${({ theme }) => theme.size.md}px;
      padding: ${({ theme }) => theme.size.rg}px
        ${({ theme }) => theme.size.lg}px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;

      &:hover {
        filter: brightness(0.95);
      }
      &[name="NEUTRAL"] {
        flex-shrink: 1;
        color: ${({ theme }) => theme.colors.textPrimary};
      }
      &[name="SUBMIT"] {
        background-color: ${({ theme }) => theme.colors.main};
        color: #fff;

        &:hover {
          filter: brightness(0.9);
        }
      }
      &[name="ALERT"] {
        background-color: red;
        color: #fff;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;
