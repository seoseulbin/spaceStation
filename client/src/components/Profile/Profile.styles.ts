import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  gap: 20px;
  padding: 30px 0 30px;
  color: ${theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.size.md}px;
  .profileContainer {
    display: flex;
    gap: 6vw;
    align-items: center;
    height: 140px;
    justify-content: center;
    box-sizing: border;
  }
  input {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
  }
  input[type="button"] {
    padding: 6px;
    width: 100%;
    text-align: center;
    border-radius: 3px;
    border: 0px;
  }
  .follow {
    color: white;
    background-color: ${({ theme }) => theme.colors.sub};
  }
  .cancel {
    background-color: ${({ theme }) => theme.colors.deepback};
  }
  .update {
    background-color: ${({ theme }) => theme.colors.deepback};
  }
`;

export const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  padding: 10px;
  object-fit: cover;
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
  cursor: pointer;
  width: 40px;
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
