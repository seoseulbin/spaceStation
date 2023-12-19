import styled from "styled-components";

type ButtonProps = {
  bgcolor?: string;
  textcolor?: string;
};

export const AnchorButton = styled.a<ButtonProps>`
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.textcolor};
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
