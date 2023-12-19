import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  z-index: 100;
  padding: 20px;
  display: grid;
  padding: 70px;
  gap: 20px;
  background-color: white;
  position: fixed;
  top: 40%;
  left: 50%;
  color: ${theme.colors.textPrimary};
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 1px solid #eee;

  .itemContainer {
    display: flex;
    align-items: center;
    gap: 30px;
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
