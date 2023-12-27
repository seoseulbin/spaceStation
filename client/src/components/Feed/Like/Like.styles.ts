import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const heartButtonDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

export const heartButton = styled.div`
  margin-right: 5px;
  background-color: transparent;
`;

export const likesNumDiv = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
