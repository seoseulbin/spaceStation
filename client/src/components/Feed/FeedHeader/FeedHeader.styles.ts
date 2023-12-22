import styled from "styled-components";

export const FeedHeader = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  input {
    background-color: transparent;
    border: 0;
    margin: -1px 0px -10px 0px;
    text-align: center;
  }
  .follow {
    color: ${({ theme }) => theme.colors.main};
  }
  .cancel {
    color: ${({ theme }) => theme.colors.textd};
  }
  .user {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;
