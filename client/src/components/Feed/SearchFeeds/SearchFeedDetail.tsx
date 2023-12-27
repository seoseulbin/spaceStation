import ApiBoundary from "../../common/ApiBoundary";
import { useSearchFeed } from "../Feed.hooks";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

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
