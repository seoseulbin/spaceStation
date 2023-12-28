import BookmarkFeedDetail from "@/components/Feed/BookmarkFeeds/BookmarkFeedDetail";
import MainHeader from "@/components/Header/MainHeader";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function BookmarkDetailPage() {
  const { cursor } = useParams();

  return (
    <>
      <MainHeader />
      <BookmarkFeedDetail cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
