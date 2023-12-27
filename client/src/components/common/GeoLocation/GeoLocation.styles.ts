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

    .MapMarker {
      width: 152px;
      height: 34px;
      color: rgb(0, 0, 0);
      padding: 3px 8px 8px;
      text-align: center;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    & ~ input {
      width: 100%;
      border-radius: 5px;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colors.deepback};
      box-sizing: border-box;
      font-size: ${({ theme }) => theme.size.md}px;
      padding: ${({ theme }) => theme.size.sm}px
        ${({ theme }) => theme.size.rg}px;
      background-color: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.sub};
    }
    & + .custom_zoomcontrol {
      border: 1px solid #919191;
      border-radius: 5px;
      position: absolute;
      top: 70px;
      right: 16px;
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
