import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;

  & > div:nth-child(1) {
    padding: 12px;
  }
`;

export const ListItem = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: relative;
  padding: ${({ theme }) => theme.size.sm / 2}px 0;

  & > svg {
    position: absolute;
    pointer-events: none;
    left: 1.5em;
  }

  & > a {
    width: 100%;
    max-width: 100%;
    text-align: left;
    padding-left: 3.5em;
  }

  &.withdraw * {
    color: red;
  }
`;

export const ListContainer = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  width: 100%;
  flex-direction: column;
`;
