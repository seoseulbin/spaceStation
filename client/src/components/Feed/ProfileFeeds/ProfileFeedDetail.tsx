import { useProfileFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

type Props = { userId: string; cursor: number };

export default function ProfileFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId, cursor }: Props) {
  const { data, setTarget, hasNextPage } = useProfileFeed(userId, cursor);

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
