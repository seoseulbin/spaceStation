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
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const AnchorButton = styled.div<CustomDivElement>`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  width: 12px;
  height: 12px;
  margin-top: -8px;
  margin-left: -8px;
  background-color: #bf5789;
  border-radius: 20px;
  cursor: pointer;

  &[data-disabled="disabled"] {
    visibility: hidden;
  }

  .plus {
    position: relative;
    right: 0px;
    bottom: 3px;
  }

  // &:before {
  //   content: "";
  //   display: block;
  //   width: 48px;
  //   height: 48px;
  //   background-color: #bf5789;
  //   opacity: 0.3;
  //   border-radius: 40px;
  //   top: -16px;
  //   left: -16px;
  //   /* transform: translate(-10px, -10px);*/
  //   -webkit-animation: ${scaleAnimation} 1.75s ease-in-out infinite;
  //   animation: ${scaleAnimation} 1.75s ease-in-out infinite;
  //   position: absolute;
  // }
`;

export const PreveiwInfo = styled.div`
  position: relative;
  right: 44px;
  top: 1px;
  width: 100px;
  padding: 5px;
  padding-top: 2px;

  border-radius: 5px;
  text-align: center;
  background-color: #bf5789;
  color: white;
  z-index: 30;

  .triangle {
    position: absolute;
    bottom: 20px;
    left: 46px;
  }
`;
