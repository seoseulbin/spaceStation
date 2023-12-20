import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: grid;
  place-items: center;
  gap: 20px;
  color: ${theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.size.md}px;
  .profileContainer {
    display: flex;
    gap: 30px;
    align-items: center;
    height: 140px;
    justify-content: center;
    box-sizing: border;
  }
  input {
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 5px;
    width: 100%;
    item-align: center;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.textDisable};
    border-radius: 3px;
    span {
      font-size: ${({ theme }) => theme.size.lg}px;
    }
  }
`;

export const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
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
  padding: 20px;
  gap: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.size.rg}px;
  span {
    font-size: ${({ theme }) => theme.size.lg}px;
    font-weight: bold;
  }
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
