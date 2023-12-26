import { useProfileFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { PATH } from "@/global/constants";

type Props = { userId: string };

export default function ProfileFeedOverview(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: Props) {
  const { data, setTarget, hasNextPage } = useProfileFeed(userId);

  return (
    <>
      <InfiniteFeedOverview
        column={3}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.profileFeedDetail(userId, "")}
      />
    </>
  );
}
