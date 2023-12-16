import styled from "styled-components";

type ButtonProps = {
  bgColor: string;
  textColor: string;
};
export const AnchorButton = styled.a<ButtonProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  width: 70%;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  font-size: ${({ theme }) => theme.size.lg}px;
  padding: ${({ theme }) => theme.size.md}px ${({ theme }) => theme.size.lg}px;
`;
