import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  width: 80vw;
  max-width: 80vw;
  overflow: auto;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 20px;
  font-size: ${({ theme }) => theme.size.md}px;
  span {
    width: 30vw;
  }
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 70%;
`;
