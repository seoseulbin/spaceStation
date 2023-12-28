import { useMyBookmardFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { FEED_COLUMN, PATH } from "@/global/constants";

export default function BookmarkFeedOverview() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { data, setTarget, hasNextPage } = useMyBookmardFeed();

  return (
    <>
      <InfiniteFeedOverview
        column={FEED_COLUMN.bookmark}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.bookmarkFeedDetail("")}
      />
    </>
  );
}
