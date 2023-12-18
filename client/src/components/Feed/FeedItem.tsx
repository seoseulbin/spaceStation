import { FeedType } from "./Feed.type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./Feed.styles";
import { Fragment, useState } from "react";
import Like from "../Like/Like";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <S.CustomSliderPrevArrow />,
  nextArrow: <S.CustomSliderNextArrow />,
};

export default function FeedItem(feed: FeedType) {
  const [more, setMore] = useState(false);
  return (
    <>
      <S.Container>
        <S.CustomSlider {...sliderSettings}>
          {feed.imgUrls.map((imgUrl, i) => (
            <Fragment key={imgUrl + i}>
              <S.ImageSquareFrame>
                <img src={imgUrl} alt={"피드 이미지"} />
              </S.ImageSquareFrame>
            </Fragment>
          ))}
        </S.CustomSlider>
        <S.TextContainer>
          {feed.content.length < 60 || more ? (
            // {여기다가 Likes 넣기}
            <>
              <Like />
              {feed.content}
            </>
          ) : (
            <>
              {feed.content.slice(0, 60)} ...{" "}
              <S.MoreReadButton onClick={() => setMore((prev) => !prev)}>
                더보기
              </S.MoreReadButton>
            </>
          )}
        </S.TextContainer>
      </S.Container>
    </>
  );
}
