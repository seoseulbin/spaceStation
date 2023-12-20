import { theme } from "@/global/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  z-index: 100;
  width: 50%;
  display: grid;
  padding: 70px;
  text-align: center;
  justify-content: center;
  gap: 20px;
  background-color: white;

  position: fixed;
  top: 40%;
  left: 50%;
  color: ${theme.colors.textPrimary};
  transform: translate(-50%, -50%);
  border-radius: 10px;

  border: 1px solid #eee;

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
