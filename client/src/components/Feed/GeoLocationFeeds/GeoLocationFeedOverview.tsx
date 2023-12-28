import { useGeoLocationFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedOverview from "../InfiniteFeedOverview";
import { FEED_COLUMN, PATH } from "@/global/constants";

type Props = { geoLocationContent: string };

export default function GeoLocationFeedOverview(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ geoLocationContent }: Props) {
  const { data, setTarget, hasNextPage } =
    useGeoLocationFeed(geoLocationContent);

  return (
    <>
      <InfiniteFeedOverview
        column={FEED_COLUMN.profile}
        pages={data.pages}
        setTarget={setTarget}
        hasNextPage={hasNextPage}
        detailLink={PATH.geoLocationFeedDetail(geoLocationContent, "")}
      />
    </>
  );
}
