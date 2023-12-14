import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import * as S from "./Feed.styles";

export default function Feed() {
  const { data, fetchNextPage, isLoading, isError, error } = useFeed();

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      {data!.pages.map(({ data: feeds }) =>
        feeds.map((feed) => (
          <Fragment key={feed._id}>
            <S.ImageContainer>
              {feed.imgUrls.map((imgUrl, i) => (
                <img key={imgUrl + i} src={imgUrl} alt={"피드 이미지"} />
              ))}
            </S.ImageContainer>
            <div>{feed.content}</div>
          </Fragment>
        )),
      )}
      <button onClick={() => fetchNextPage()}>next</button>
    </>
  );
}
