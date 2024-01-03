import styled from "styled-components";

export const Container = styled.div`
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  height: 40px;
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.deepback};
  overflow-x: auto;
  background-color: #fffcf8;

  &::-webkit-scrollbar {
    width: 8px;
    height: 4px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.sub};
    border-radius: 6px;
  }
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
