import { useCategoryFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

type Props = { categoryId: string; cursor: number };

export default function CategoryFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ categoryId, cursor }: Props) {
  const { data, setTarget, hasNextPage } = useCategoryFeed(categoryId, cursor);

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
