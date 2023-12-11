// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth} - 10) px;
  &:hover {
    background-color: green;
  }
`;
