import styled from "styled-components";

export const Container = styled.div`
  background-color: none;
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  max-height: 870px;
  &:hover {
    background-color: lightgray;
  }
  text-align: left;
  border: 1px solid gray;
  padding: 10px 10px;
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  cursor: pointer;
`;

export const FeedContainer = styled.div`
  background-color: ivory;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  height: 870px;
  margin: 30px 30px;
  border: 1px solid black;
  transform: translate(50%, 0%);
`;

export const CommentWindowContainer = styled.div`
  background-color: ivory;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 190px);
  height: 700px;
  margin: 30px 30px;
  border: 1px solid black;
  position: relative;
  transform: translate(10%, 10%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const FeedCommentButton = styled.button`
  background-color: black;
  color: white;
  border: 3px solid gray;
  border-radius: 20px;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  flex-direction: row
  background-color: transparent;
  color: #262626; 
  align-self: flex-end; 
  cursor: pointer;
  margin: 10px 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const InputWrapper = styled.form`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: none;
  z-index: 1;
  padding: 10px;
  display: flex;
  align-items: center;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
`;

export const InputField = styled.input`
  padding: 10px;
  margin-right: 8px;
  border: 1px solid darkgray;
  border-radius: 20px;
  outline: none;
  background-color: gray;
  width: 100%;
`;

export const SubmitButton = styled.button`
  padding: 4px;
  width: 50px;
  background-color: #389cd7;
  color: white;
  border: 3px solid #389cd7;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
