import { FeedType } from "./Feed.type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./Feed.styles";
import { Fragment, useState } from "react";
import FeedHeader from "./FeedHeader/FeedHeader";
import Comment from "./Comments/Comments";
import Like from "./Like/Like";
import Bookmark from "./Bookmark/Bookmark";

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

  //댓글창을 오버레이로 렌더하기 위해 모달을 사용.
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <>
      <S.Container>
        <FeedHeader feedId={feed._id} userId={feed.userId} />
        <S.CustomSlider {...sliderSettings}>
          {feed.imgUrls.map((imgUrl, i) => (
            <Fragment key={imgUrl + i}>
              <S.ImageSquareFrame>
                <img src={imgUrl} alt={"피드 이미지"} />
              </S.ImageSquareFrame>
            </Fragment>
          ))}
        </S.CustomSlider>
        <Like feedId={feed._id} />

        <S.CommentContainer
          key={feed._id}
          onClick={() => setIsCommentModalOpen(true)}
        >
          댓글
        </S.CommentContainer>
        <Bookmark feedId={feed._id} />

        {isCommentModalOpen && (
          <Comment
            feedId={feed._id}
            feedUser={feed.userId}
            onClickClose={() => setIsCommentModalOpen(false)}
          />
        )}

        <S.TextContainer>
          {feed.content.length < 60 || more ? (
            <>{feed.content}</>
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
