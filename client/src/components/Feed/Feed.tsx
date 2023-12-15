import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import FeedImageContainer from "./FeedImageContainer";

export default function Feed() {
  const { data, isLoading, isError, error, setTarget } = useFeed();

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      {data!.pages.map(({ data: feeds }) =>
        feeds.map((feed) => (
          <Fragment key={feed._id}>
            <FeedImageContainer imgUrls={feed.imgUrls} />
            <div>{feed.content}</div>
          </Fragment>
        )),
      )}
      <div ref={setTarget}></div>
    </>
  );
}
