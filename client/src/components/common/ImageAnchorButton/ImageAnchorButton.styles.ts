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
  padding: 2px;

  -webkit-transition: transform 0.2s ease-out;
  transition: transform 0.2s ease-out;

  &[data-dragging="DRAGGING"] {
    -webkit-transform: scale(2);
    transform: scale(2);
    z-index: 11;
  }

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

export const PreveiwInfo = styled.div<{
  x: number;
  y: number;
  length: number;
  isactive: boolean;
}>`
  position: relative;
  right: ${(props) => props.x}px;
  bottom: ${(props) => (props.y > 85 ? 50 : -6)}px;
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

  pointer-events: ${(props) => (props.isactive === true ? "auto" : "none")};
  opacity: ${(props) => (props.isactive === true ? 1 : 0)};

  -webkit-transform: scale(${(props) => (props.isactive === true ? 1 : 0.35)});
  transform: scale(${(props) => (props.isactive === true ? 1 : 0.35)});

  -webkit-transition: all 0.325s cubic-bezier(0.05, 0.92, 0.37, 1.12);
  transition: all 0.325s cubic-bezier(0.05, 0.92, 0.37, 1.12);

  transform-origin: ${(props) => 2 + props.x}px
    ${(props) => (props.y > 85 ? 22 : 0)}px;

  .triangle {
    color: #bf5789;
    position: absolute;
    bottom: ${(props) => (props.y > 85 ? -5 : 20)}px;
    transform: ${(props) => (props.y > 85 ? "scaleY(-1)" : "scaleY(1)")};
    left: ${(props) => 2 + props.x}px;
  }
`;
