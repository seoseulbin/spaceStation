import styled from "styled-components";

export const Container = styled.header`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  box-shadow: 0 2px 3px 1px gray;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 99;
`;

export const ContainerLeftDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;

  & div {
    margin-right: 10px;
  }
`;

export const ArrowButtonDiv = styled.div`
  cursor: pointer;
`;

export const HeaderTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const ContainerRightDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  color: ${(prop) => prop.color || "black"};
  font-size: 16px;
  cursor: pointer;
`;
