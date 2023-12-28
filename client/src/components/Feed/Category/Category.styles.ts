import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: ${({ theme }) => theme.size.maxWidth}px);
  height: 40px;
  margin: 0 auto;
  border-bottom: 1px solid #e7e7e7;
  overflow-x: auto;
`;

export const CategoryList = styled.div`
  width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  height: 100%;
  display: flex;
  font-weight: bold;
  position: relative;
`;

export const CategoryStyle = styled.div<{
  $index: number;
  $fontColor: string;
}>`
  position: absolute;
  width: 90px;
  height: 30px;
  margin: 5px 2px;
  border-radius: 3px;
  left: ${(props) => props.$index * 95}px;
  background-color: ${(props) => props.$fontColor};
  transition: all 0.3s ease-out;
`;

export const Category = styled.div<{
  $isActive: boolean;
}>`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin: 2px;
  color: ${(props) => (props.$isActive ? "white" : "black")};
  z-index: 1;
  transition: all 0.3s ease-out;
`;
