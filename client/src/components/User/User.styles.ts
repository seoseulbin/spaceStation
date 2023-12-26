import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: ${({ theme }) => theme.size.md}px;
  text-align: center;
`;

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  object-fit: cover;
`;
