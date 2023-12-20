import styled from "styled-components";

export const Container = styled.div`
  background-color: blue;
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  width: 100%;
  height: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const CategoryList = styled.ul`
  display: flex;
`;
