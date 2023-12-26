import styled, { keyframes } from "styled-components";

import { MdDelete } from "react-icons/md";

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
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  z-index: 2;
  border: none;

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
  margin-top: 32px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  background-color: none;
  font-size: ${({ theme }) => theme.size.md}px;
  width: 96%;
  &:hover {
    background-color: lightgray;
  }

  padding: 5px;
  margin-bottom: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 200px;
`;

export const Comment = styled.p`
  margin-left: 38px;
  color: "#666666";
  font-size: ${({ theme }) => theme.size.rg}px;
`;

export const CommentDate = styled.p`
  margin-top: 4px;
  color: gray;
  font-size: ${({ theme }) => theme.size.md - 6}px;
`;

export const DeleteButton = styled(MdDelete)`
  cursor: pointer;
  margin: 7px;
  color: lightgray;
`;

export const User = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const FeedCommentButton = styled.button`
  background-color: black;
  color: white;
  border: 3px solid gray;
  border-radius: 20px;
  cursor: pointer;
`;

export const InputWrapper = styled.form`
  position: fixed;
  background-color: none;
  display: flex;
  align-items: center;
  width: 100%;
  bottom: 0;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1px solid darkgray;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  outline: none;
  background-color: gray;
  width: 100%;
  height: 20px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #389cd7;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10;
  margin-bottom: 5px;
  border: none;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
