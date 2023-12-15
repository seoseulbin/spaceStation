import Slider from "react-slick";
import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
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
