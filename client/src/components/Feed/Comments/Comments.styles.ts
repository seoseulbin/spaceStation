import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FiSend } from "react-icons/fi";

export const Container = styled.div`
  background-color: none;
  font-size: ${({ theme }) => theme.size.md}px;
  width: 99%;
  &:hover {
    background-color: lightgray;
  }

  padding: 5px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Comment = styled.p`
  margin-top: 3px;
`;

export const CommentDate = styled.p`
  margin-top: 1px;
  color: gray;
  font-size: ${({ theme }) => theme.size.md - 6}px;
`;

export const DeleteButton = styled(MdDelete)`
  cursor: pointer;
  margin-top: 3px;
`;

export const User = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CommentWindowContainer = styled.div`
  position: fixed;
  right: 10%;
  top: 20%;
  background-color: lightgray;
  width: 80%;
  height: 80%;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const CloseButton = styled(IoClose)`
  align-self: flex-end;
  cursor: pointer;
  margin: 5px;
`;

export const FeedCommentButton = styled.button`
  background-color: black;
  color: white;
  border: 3px solid gray;
  border-radius: 20px;
  cursor: pointer;
`;

export const CommentsCollection = styled.div`
  position: relative;
`;

export const InputWrapper = styled.form`
  background-color: none;
  display: flex;
  align-items: center;
  width: 78%;
  height: 240px;

  justify-content: center;

  margin-bottom: 10px;
  position: fixed;
  bottom: 0;
  margin-left: 6px;
`;

export const InputField = styled.input`
  padding: 10px;
  margin-right: 8px;
  border: 1px solid darkgray;
  border-radius: 20px;
  outline: none;
  background-color: gray;
  width: 98%;

  align-item: center;
`;

export const SubmitButton = styled(FiSend)`
  padding: 5px;
  width: 30px;
  background-color: #389cd7;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
