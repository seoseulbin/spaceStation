import { styled } from "styled-components";

export const GeoLocationInnerLayout = styled.div`
  width: 500px;
  max-width: 100%;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  border-radius: 8px;
  flex-direction: column;
  gap: 8px;

  & #map {
    width: 100%;
    height: 400px;
    background-color: #ededed;
    border-radius: 5px;
  }
`;
