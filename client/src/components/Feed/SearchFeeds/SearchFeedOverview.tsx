import { useSearchFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { FEED_COLUMN, PATH } from "@/global/constants";

type Props = {
  query: string;
};

export default function SearchFeedOverview(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ query }: Props) {
  const { data, setTarget, hasNextPage } = useSearchFeed(query);

  return (
    <>
      <InfiniteFeedOverview
        column={FEED_COLUMN.search}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.searchFeedDetail(query, "")}
      />
    </>
  );
}
