import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  display: grid;
  padding: 40px;
  gap: 20px;
  background-color: white;
  position: fixed;
  border-radius: 10px;
  border: 1px solid ${theme.colors.textDisable};

  .itemContainer {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .nickname {
    text-align: center;
    vertical-align: middle;
  }
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 70%;
`;
