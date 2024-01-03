import styled from "styled-components";

export const FeedHeader = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  input {
    background-color: transparent;
    padding: 2px;
    border: 0;
    margin-top: 1px;
  }

  .follow {
    color: ${({ theme }) => theme.colors.main};
  }

  .cancel {
    color: ${({ theme }) => theme.colors.textDisable};
  }

  .user {
    gap: 15px;
    align-items: center;

    span {
      max-width: 60vw;
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
    }
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
