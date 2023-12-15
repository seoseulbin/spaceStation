import { Fragment } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./Feed.styles";

export default function FeedImageContainer({ imgUrls }: { imgUrls: string[] }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <S.CustomSliderPrevArrow />,
    nextArrow: <S.CustomSliderNextArrow />,
  };

  return (
    <>
      <S.CustomSlider {...settings}>
        {imgUrls.map((imgUrl, i) => (
          <Fragment key={imgUrl + i}>
            <S.ImageSquareFrame>
              <img src={imgUrl} alt={"피드 이미지"} />
            </S.ImageSquareFrame>
          </Fragment>
        ))}
      </S.CustomSlider>
    </>
  );
}
