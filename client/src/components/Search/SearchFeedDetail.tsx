import ApiBoundary from "../common/ApiBoundary";
import { useSearchFeed } from "../Feed/Feed.hooks";
import InfiniteFeedDetail from "../Feed/InfiniteFeedDetail";

type Props = {
  query: string;
  cursor: number;
};

export default function SearchFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ query, cursor }: Props) {
  const { data, setTarget, hasNextPage } = useSearchFeed(query, cursor);

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
