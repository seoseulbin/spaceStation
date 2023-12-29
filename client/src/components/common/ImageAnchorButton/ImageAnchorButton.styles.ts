import styled from "styled-components";
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

  &:before {
    content: "";
    display: block;
    width: 48px;
    height: 48px;
    background-color: transparent;
    opacity: 0.3;
    border-radius: 40px;
    top: -16px;
    left: -16px;
    position: absolute;
  }
`;

export const PreveiwInfo = styled.div<{ x: number; y: number; length: number }>`
  position: relative;
  right: ${(props) => props.x}px;
  bottom: ${(props) => (props.y > 85 ? 44 : -1)}px;
  width: ${(props) => (props.length * 15 <= 100 ? 100 : props.length * 15)}px;
  padding: 5px;
  padding-top: 2px;

  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bf5789;
  color: white;
  z-index: 30;

  .triangle {
    position: absolute;
    bottom: ${(props) => (props.y > 85 ? -5 : 20)}px;
    transform: ${(props) => (props.y > 85 ? "scaleY(-1)" : "scaleY(1)")};
    left: ${(props) => 2 + props.x}px;
  }
`;
