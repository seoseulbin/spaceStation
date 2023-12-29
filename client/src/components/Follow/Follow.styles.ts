import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  cursor: pointer;
  align-items: center;
  max-width: 80vw;
  gap: 20px;
  width: 450px;
  justify-content: center;
`;

export const UserContainer = styled.div`
  display: flex;
  width: 350px;
  align-items: center;
  padding: 10px 10px 20px;
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 70vw;
  border-bottom: 1px solid #eee;
  font-size: ${({ theme }) => theme.size.md}px;
`;

export const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 70%;
`;
