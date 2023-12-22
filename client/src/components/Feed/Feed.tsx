import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import FeedItem from "./FeedItem";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";
import Category from "./Category/Category";

export default function Feed() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { data, setTarget, hasNextPage } = useFeed();

  return (
    <>
      <Category categoryId={""} />
      {data.pages.map(({ data: feeds }) =>
        feeds.map((feed) => (
          <Fragment key={feed._id}>
            <FeedItem {...feed} />
          </Fragment>
        )),
      )}
      {hasNextPage && (
        <div ref={setTarget}>
          <Loading />
        </div>
      )}
    </>
  );
}
