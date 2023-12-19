import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const heartButtonDiv = styled.div`
  margin: 0 5px;
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

export const heartButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const likesNumDiv = styled.div`
  font-weight: 600;
`;
