import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 3vh 0 4vh;
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
    width: 50%;
    padding: 10px;
    background-color: transparent;
    border-radius: 5px;
  }
  input[type="button"] {
    padding: 6px;
    width: 160px;
    max-width: 50vw;
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
  max-width: 30vw;
  max-height: 30vw;
  border-radius: 70%;
  padding: 10px;
  object-fit: cover;
`;

export const Follow = styled.ul`
  width: 100%;
  max-width: 50vw;
  display: flex;
  padding-bottom: 5px;
  justify-content: center;
`;

export const Following = styled.li`
  display: grid;
  padding: 15px;
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
  margin-top: 2vh;
  font-size: ${({ theme }) => theme.size.md}px;
  border: 1px solid #ddd;
  justify-content: center;
`;
