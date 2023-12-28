import { useGeoLocationFeed } from "../Feed.hooks";
import ApiBoundary from "../../common/ApiBoundary";
import InfiniteFeedDetail from "../InfiniteFeedDetail";

type Props = { geoLocationContent: string; cursor: number };

export default function GeoLocationFeedDetail(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ geoLocationContent, cursor }: Props) {
  const { data, setTarget, hasNextPage } = useGeoLocationFeed(
    geoLocationContent,
    cursor,
  );

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
