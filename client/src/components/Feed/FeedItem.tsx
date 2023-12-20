import { FeedType } from "./Feed.type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./Feed.styles";
import { Fragment, useState } from "react";
import FeedOption from "../FeedOption/FeedOption";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openOption = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };
  const closeOption = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };
  return (
    <>
      <S.Container>
        <div className="FeedHeader">
          <button onClick={() => openOption()}>옵션 버튼</button>
        </div>
        <FeedOption
          feedId={feed._id}
          isOpen={isOpen}
          closeOption={closeOption}
        />
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
            feed.content
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
