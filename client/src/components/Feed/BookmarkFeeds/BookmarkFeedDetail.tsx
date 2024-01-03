import ApiBoundary from "../../common/ApiBoundary";
import { useMyBookmardFeed } from "../Feed.hooks";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

type Props = { cursor: number };

export default function BookmarkFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ cursor }: Props) {
  const { data, setTarget, hasNextPage } = useMyBookmardFeed(cursor);

  return (
    <>
      <InfiniteFeedDetail
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
