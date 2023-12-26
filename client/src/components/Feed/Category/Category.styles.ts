import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  height: 35px;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  overflow-x: auto;
`;

export const CategoryList = styled.div`
  width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  height: 100%;
  display: flex;
  font-weight: bold;
`;

export const Category = styled.div<{ $isActive: boolean; $fontColor: string }>`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin: 2px;
  color: ${(props) => (props.$isActive ? "white" : "black")};
  background-color: ${(props) =>
    props.$isActive ? props.$fontColor : "white"};
  cursor: pointer;
`;
