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
    height: 300px;
    background-color: #ededed;
    border-radius: 5px;

    .custom_zoomcontrol {
      border: 1px solid #919191;
      border-radius: 5px;
      position: absolute;
      top: 24px;
      right: 24px;
      width: 36px;
      height: 80px;
      overflow: hidden;
      z-index: 2;
      background-color: #fff;

      & span {
        display: block;
        width: 36px;
        height: 40px;
        text-align: center;
        cursor: pointer;

        &:first-child {
          border-bottom: 1px solid #bfbfbf;
        }

        &:hover {
          filter: brightness(0.95);
          background-color: #fcfcfc;
        }

        img {
          width: 15px;
          height: 15px;
          padding: 12px 0;
          border: none;
        }
      }
    }
  }
`;
