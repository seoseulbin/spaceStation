import HashtagFeedOverview from "@/components/Feed/HashtagFeeds/HashtagFeedOverview";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function HashtagFeedOverviewPage() {
  const { hashtag } = useParams();

  return (
    <>
      <Header headerTitle={`#${hashtag}`} backArrow={true} />
      <HashtagFeedOverview hashtag={hashtag!} />
      <Navbar />
    </>
  );
}
