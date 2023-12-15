import Slider from "react-slick";
import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 3rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CustomSlider = styled(Slider)`
  margin-bottom: 3rem;

  & .slick-dots li {
    margin: 0;
    width: 0.875rem;
  }
`;

export const CustomSliderNextArrow = styled.button`
  right: 1rem;
`;

export const CustomSliderPrevArrow = styled.button`
  left: 1rem;
  z-index: 1;
`;

export const ImageSquareFrame = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  flex-shrink: 0;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    user-select: none;
    -webkit-user-drag: none;
    transition: transform 0.5s;
  }
`;

export const TextContainer = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 20px;
`;

export const MoreReadButton = styled.button`
  font-family: inherit;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 0;
  padding: 0;

  line-height: 14px;
`;
