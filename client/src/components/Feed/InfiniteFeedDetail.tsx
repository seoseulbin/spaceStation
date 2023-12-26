import { Fragment } from "react";
import FeedItem from "./FeedItem";
import Loading from "../common/Loading/Loading";
import { FeedInifiteQueryHookType } from "./Feed.type";

type Props = FeedInifiteQueryHookType;

export default function InfiniteFeedDetail(props: Props) {
  const { pages, setTarget, hasNextPage } = props;

  return (
    <>
      {pages.map(({ data: feeds }) =>
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
