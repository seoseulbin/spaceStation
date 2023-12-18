import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const heartButton = styled.div`
  margin: 0 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const likesNumDiv = styled.div`
  font-weight: 600;
`;
