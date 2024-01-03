import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const heartButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

export const heartButton = styled.div`
  background-color: transparent;
`;

export const likesNumDiv = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.size.sm}px;
`;
