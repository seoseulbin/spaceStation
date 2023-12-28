import styled from "styled-components";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 600;

  & button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    font-size: ${({ theme }) => theme.size.md}px;
    padding: ${({ theme }) => theme.size.rg}px ${({ theme }) => theme.size.lg}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
    line-height: 1;

    border: 1px solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
    background-color: transparent;

    &:hover {
      background-color: ${({ theme }) => theme.colors.deepback};
    }
  }
`;

export const RequestFailedImg = styled.img`
  width: 25vw;
  position: relative;
  max-width: 180px;
`;
