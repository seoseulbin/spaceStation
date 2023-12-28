import GeoLocationFeedOverview from "@/components/Feed/GeoLocationFeeds/GeoLocationFeedOverview";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function GeoLocationFeedOverviewPage() {
  const { geoLocationContent } = useParams();

  return (
    <>
      <Header headerTitle={geoLocationContent} backArrow={true} />
      <GeoLocationFeedOverview geoLocationContent={geoLocationContent!} />
      <Navbar />
    </>
  );
}
