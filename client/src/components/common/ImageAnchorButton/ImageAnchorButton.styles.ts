import styled, { keyframes } from "styled-components";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomDivProps = {
  x: number;
  y: number;
};

type CustomDivElement = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  keyof CustomDivProps
> &
  CustomDivProps;

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
`;

export const AnchorButton = styled.div<CustomDivElement>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
  background-color: ${({ theme }) => theme.colors.main};
  opacity: 0.9;
  border-radius: 20px;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: 36px;
    height: 36px;
    background-color: ${({ theme }) => theme.colors.main};
    opacity: 0.3;
    border-radius: 40px;
    top: -10px;
    left: -10px;
    /* transform: translate(-10px, -10px);*/
    animation: ${scaleAnimation} 1.75s ease-in-out infinite;
    position: absolute;
  }
`;
