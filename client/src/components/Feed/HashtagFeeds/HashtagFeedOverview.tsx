import { useHashtagFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { FEED_COLUMN, PATH } from "@/global/constants";

type Props = { hashtag: string };

export default function HashtagFeedOverview(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ hashtag }: Props) {
  const { data, setTarget, hasNextPage } = useHashtagFeed(hashtag);

  return (
    <>
      <InfiniteFeedOverview
        column={FEED_COLUMN.profile}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.hashtagFeedDetail(hashtag, "")}
      />
    </>
  );
}
