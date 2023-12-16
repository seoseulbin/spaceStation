import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  &:hover {
    background-color: green;
  }
`;

export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 70%;
`;

export const Follow = styled.ul`
  display: flex;
`;

export const Following = styled.li`
  display: grid;
  margin: 10px;
  text-align: center;
`;
