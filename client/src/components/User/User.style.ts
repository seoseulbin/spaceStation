import styled from "styled-components";

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.deepback};
`;
export const UserProfileImage = styled.img`
  width: 15%;
  border-radius: 50%;
  margin: 3% 0 3% 15%;
`;
export const UserProfileName = styled.span`
  border-radius: 50%;
  margin: 3% 5%;
  font-size: ${({ theme }) => theme.size.md}px;
`;
