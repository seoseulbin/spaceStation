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
  padding: 10px;
`;

export const Follow = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Following = styled.li`
  display: grid;
  margin: 10px;
  text-align: center;
`;

export const Upload = styled.div`
  color: ${({ theme }) => theme.colors.main};
  position: absolute;
  font-weight: bold;
  top: 20px;
  cursor: pointer;
  right: 20px;
`;

export const UpdateInput = styled.input`
  padding: 10px;
  box-sizing: border-box;
  items-align: center;
  text-align: center;
  font-size: ${({ theme }) => theme.size.md}px;
  border: 1px solid #ddd;
  justify-content: center;
`;
