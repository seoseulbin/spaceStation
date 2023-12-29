import styled from "styled-components";

export const EmptyCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  padding: 2em 0;

  & img {
    max-width: 100px;

    &[alt="USER"],
    &[alt="COMMENT"] {
      max-width: 126px;
    }
  }
`;
