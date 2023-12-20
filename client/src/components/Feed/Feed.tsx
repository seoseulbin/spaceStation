import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import FeedItem from "./FeedItem";
import Loading from "../common/Loading";
import Category from "../Category/Category";

export default function Feed() {
  const { data, isLoading, isError, error, setTarget } = useFeed();

  if (isLoading) return <Loading />;
  if (isError) return error.message;

  return (
    <>
      <Category />
      {data!.pages.map(({ data: feeds }) =>
        feeds.map((feed) => (
          <Fragment key={feed._id}>
            <FeedItem {...feed} />
          </Fragment>
        )),
      )}
      <div ref={setTarget}>
        <Loading />
      </div>
    </>
  );
}
