import { useCategoryFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { FEED_COLUMN, PATH } from "@/global/constants";

type Props = { categoryId: string };

export default function CategoryFeedOverview(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ categoryId }: Props) {
  const { data, setTarget, hasNextPage } = useCategoryFeed(categoryId);

  return (
    <>
      <InfiniteFeedOverview
        column={FEED_COLUMN.category}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.categoryDetail(categoryId, "")}
      />
    </>
  );
}
