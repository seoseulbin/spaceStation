import { FeedType } from "./Feed.type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./Feed.styles";
import { Fragment, useState } from "react";
import FeedHeader from "./FeedHeader/FeedHeader";
import CommentContainer from "./Comments/CommentContainer";
import Like from "./Like/Like";
import Bookmark from "./Bookmark/Bookmark";
import ImageFeedTagButton from "../common/ImageFeedTagButton/ImageFeedTagButton";
import { Link } from "react-router-dom";
import { IoIosPin } from "react-icons/io";

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
            <Fragment key={`${imgUrl.url} + ${i}`}>
              <S.ImageSquareFrame>
                <img src={imgUrl.url} alt={"피드 이미지"} />
                {imgUrl &&
                  imgUrl.tagPosition?.map((item, index) => (
                    <ImageFeedTagButton
                      key={index}
                      index={String(index)}
                      x={item.x}
                      y={item.y}
                      currentImage={imgUrl}
                    />
                  ))}
              </S.ImageSquareFrame>
            </Fragment>
          ))}
        </S.CustomSlider>

        <S.ButtonContainer>
          <S.ButtonLeftDiv>
            <Like feedId={feed._id} />
          </S.ButtonLeftDiv>
          <S.ButtonRightDiv>
            <S.CommentContainer
              key={feed._id}
              onClick={() => setIsCommentModalOpen(true)}
            />
            <Bookmark feedId={feed._id} />
          </S.ButtonRightDiv>
        </S.ButtonContainer>

        {isCommentModalOpen && (
          <CommentContainer
            feedId={feed._id}
            feedUser={feed.userId}
            onClickClose={() => setIsCommentModalOpen(false)}
          />
        )}
        {feed.geoLocation?.content && (
          <S.GeoLocationContainer>
            <IoIosPin size={18} />
            {feed.geoLocation?.content}
          </S.GeoLocationContainer>
        )}
        <S.TextContainer>
          {(feed.content.length < 60 &&
            feed.content.split("\n").length === 1) ||
          more ? (
            <>
              {feed.content}
              <br />
              {feed.hashtag?.map((tag, index) => {
                //TODO : 검색 링크로 이어져야함
                return (
                  <Link key={`${feed._id}_${index}`} to="/">
                    {tag}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {feed.content.split("\n")[0].slice(0, 60)}
              ...{" "}
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
