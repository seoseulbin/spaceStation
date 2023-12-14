import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import * as S from "./Feed.styles";

export default function Feed() {
  const { feeds, isLoading, isError, error } = useFeed();

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      {feeds!.map((feed) => (
        <Fragment key={feed._id}>
          <S.ImageContainer>
            {feed.imgUrls.map((imgUrl, i) => (
              <img key={imgUrl + i} src={feed.imgUrls[0]} alt={"피드 이미지"} />
            ))}
          </S.ImageContainer>
          <div>{feed.content}</div>
        </Fragment>
      ))}
    </>
  );
}
