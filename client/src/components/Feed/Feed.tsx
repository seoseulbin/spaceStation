import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import FeedItem from "./FeedItem";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";

export default function Feed() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { data, setTarget } = useFeed();

  return (
    <>
      {data.pages.map(({ data: feeds }) =>
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
