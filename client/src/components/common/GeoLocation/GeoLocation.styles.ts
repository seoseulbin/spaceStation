import { styled } from "styled-components";

export const GeoLocationInputSection = styled.section`
  gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  & div {
    position: relative;

    & svg {
      position: absolute;
      top: 12px;
      left: 14px;
      color: ${({ theme }) => theme.colors.sub};
    }
  }
  & button {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    font-size: ${({ theme }) => theme.size.md}px;
    padding: ${({ theme }) => theme.size.rg}px ${({ theme }) => theme.size.lg}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.deepback};
    }
  }
`;

export const GeoLocationInput = styled.input`
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.deepback};
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.size.md}px;
  padding: ${({ theme }) => theme.size.sm}px ${({ theme }) => theme.size.rg}px;
  background-color: ${({ theme }) => theme.colors.deepback};
  color: ${({ theme }) => theme.colors.sub};
  padding-left: ${({ theme }) => theme.size.md * 2.5}px;
`;

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

    & ~ section {
      padding-top: 0.5em;

      & div {
        position: relative;
      }

      & svg {
        position: absolute;
        top: 12px;
        left: 14px;
        color: ${({ theme }) => theme.colors.sub};
      }

      & input {
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
        padding-left: ${({ theme }) => theme.size.md * 2.5}px;
      }
    }
    & + .custom_zoomcontrol {
      border: 1px solid #919191;
      border-radius: 5px;
      position: absolute;
      top: 90px;
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
