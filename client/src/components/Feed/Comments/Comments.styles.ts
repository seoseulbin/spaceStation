import styled, { keyframes } from "styled-components";

const slideInFromBelow = keyframes`
  from {
    transform: translateY(100%);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const CommentWindowContainer = styled.div`
  animation: ${slideInFromBelow} 0.3s ease-in-out;

  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  height: 80%;
  max-height: 70vh;
  overflow-y: auto;
  border: none;
  display: flex;
  flex-direction: column;
  z-index: 2;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const CommentHeader = styled.div`
  position: fixed;
  color: black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  height: 50px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  cursor: pointer;

  margin-right: 8px;
  margin-top: 8px;

  position: fixed;
  border: none;
  background: none;
  z-index: 3;

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const CommentsCollection = styled.div`
  position: relative;
  margin-top: 50px;
  margin-bottom: 46px;
`;

export const Container = styled.div<{ flash?: boolean }>`
  font-size: ${({ theme }) => theme.size.md}px;
  width: 96%;
  margin-bottom: 10px;
  animation: ${({ flash }) =>
    flash &&
    `
      flashAnimation 3s ease;
      @keyframes flashAnimation {
        0% {
          background-color: gray;
        }
        100% {
          background-color: lightgray;
        }
      }
    `};

  padding: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  div {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: ${({ theme }) => theme.size.rg}px;
    text-align: center;
  }

  img {
    width: 34px;
    height: 34px;
    border-radius: 70%;
    object-fit: cover;
  }
`;

export const Comment = styled.p`
  margin-left: 56px;
  margin-top: 2px;
  color: "#666666";
  font-size: ${({ theme }) => theme.size.md}px;

  white-space: pre-line;
`;

export const CommentDate = styled.p`
  color: gray;
  font-size: ${({ theme }) => theme.size.md - 6}px;
  margin-left: 8px;
`;

export const DeleteButton = styled.div`
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;
  color: black;
  font-size: ${({ theme }) => theme.size.sm}px;
`;

export const User = styled.div`
  display: flex;
`;

export const FeedCommentButton = styled.button`
  background-color: black;
  color: white;
  border: 3px solid gray;
  border-radius: 20px;
  cursor: pointer;
`;

export const InputWrapper = styled.form`
  max-width: ${({ theme }) => theme.size.maxWidth}px;

  position: fixed;
  background-color: none;
  display: flex;
  align-items: center;
  width: 100%;
  bottom: 0;
`;

export const InputField = styled.textarea`
  padding: 16px;
  border: none;
  outline: none;
  background-color: ivory;
  width: 100%;
  height: 20px;
  //텍스트가 여러 줄 보이도록 css 속성 지정하기
  word-break: break-all;
`;

export const SubmitButton = styled.button`
  padding: 16px;
  background-color: #815f50;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: ${({ theme }) => theme.size.md}px;
  text-align: center;
`;

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  object-fit: cover;
`;
