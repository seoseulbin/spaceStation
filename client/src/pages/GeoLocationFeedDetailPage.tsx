import GeoLocationFeedDetail from "@/components/Feed/GeoLocationFeeds/GeoLocationFeedDetail";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function GeoLocationFeedDetailPage() {
  const { geoLocationContent, cursor } = useParams();

  return (
    <>
      <Header headerTitle={geoLocationContent} backArrow={true} />
      <GeoLocationFeedDetail
        geoLocationContent={geoLocationContent!}
        cursor={Number(cursor!)}
      />
      <Navbar />
    </>
  );
}
