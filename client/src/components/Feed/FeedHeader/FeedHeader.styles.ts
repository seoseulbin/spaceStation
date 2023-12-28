import styled from "styled-components";

export const FeedHeader = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  input {
    background-color: transparent;
    border: 0;
    margin: 0px 0px -5px 0px;
    text-align: center;
  }

  .follow {
    color: ${({ theme }) => theme.colors.main};
  }

  .cancel {
    color: ${({ theme }) => theme.colors.textDisable};
  }

  .user {
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: ${({ theme }) => theme.size.md}px;
    text-align: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 70%;
    object-fit: cover;
  }
`;
