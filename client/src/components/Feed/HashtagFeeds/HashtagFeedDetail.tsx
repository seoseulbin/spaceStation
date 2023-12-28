import { useHashtagFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

type Props = { hashtag: string; cursor: number };

export default function HashtagFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ hashtag, cursor }: Props) {
  const { data, setTarget, hasNextPage } = useHashtagFeed(hashtag, cursor);

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
