import HashtagFeedDetail from "@/components/Feed/HashtagFeeds/HashtagFeedDetail";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function HashtagFeedDetailPage() {
  const { hashtag, cursor } = useParams();

  return (
    <>
      <Header headerTitle={`#${hashtag}`} backArrow={true} />
      <HashtagFeedDetail hashtag={hashtag!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
