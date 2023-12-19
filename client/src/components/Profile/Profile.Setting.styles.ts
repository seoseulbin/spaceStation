import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  & > div:nth-child(1) {
    padding: 12px;
  }
`;

export const ListItem = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;

  & > svg {
    position: absolute;
    pointer-events: none;
    left: 1em;
  }

  & > a {
    width: 100%;
    max-width: 100%;
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
