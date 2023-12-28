import styled from "styled-components";

export const UserProfileContainer = styled.div`
  & div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.colors.deepback};
  }
  & img {
    width: 15%;
    border-radius: 50%;
    margin: 3% 0 3% 15%;
  }
  & span {
    border-radius: 50%;
    margin: 3% 5%;
    font-size: ${({ theme }) => theme.size.md}px;
  }
`;
