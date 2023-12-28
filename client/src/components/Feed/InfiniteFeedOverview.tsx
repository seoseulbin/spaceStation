import { Link } from "react-router-dom";
import * as S from "./Feed.styles";
import Loading from "../common/Loading/Loading";
import { FeedInifiteQueryHookType } from "./Feed.type";
import { Fragment } from "react";

type Props = {
  column: number;
  detailLink: string;
} & FeedInifiteQueryHookType;

export default function InfiniteFeedOverview(props: Props) {
  const { column, detailLink, pages, hasNextPage, setTarget } = props;
  return (
    <>
      {pages[0].data.length === 0 && "피드가 없습니다."}
      {pages.map(({ data: feeds }, pageIndex) => (
        <S.GridFeedItem $column={column} key={"gridFeedItem" + pageIndex}>
          {feeds.map((feed, feedIndex) => (
            <Fragment key={feed._id}>
              <Link to={`${detailLink}${pageIndex * column * 4 + feedIndex}`}>
                <S.ImageCoverSquareFrame imgurl={feed.imgUrls[0].url}>
                  <img src={feed.imgUrls[0].url} alt="피드 이미지" />
                </S.ImageCoverSquareFrame>
              </Link>
            </Fragment>
          ))}
        </S.GridFeedItem>
      ))}
      {hasNextPage && (
        <div ref={setTarget}>
          <Loading />
        </div>
      )}
    </>
  );
}
