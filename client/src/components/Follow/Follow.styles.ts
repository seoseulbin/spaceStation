import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  width: 80vw;
  max-width: 80vw;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.div`
  display: flex;

  align-items: center;
  gap: 60px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  font-size: ${({ theme }) => theme.size.md}px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 70%;
`;
