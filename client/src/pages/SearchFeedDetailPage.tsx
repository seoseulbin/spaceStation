import SearchFeedDetail from "@/components/Feed/SearchFeeds/SearchFeedDetail";
import MainHeader from "@/components/Header/MainHeader";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function SearchFeedDetailPage() {
  const { query, cursor } = useParams();

  return (
    <>
      <MainHeader />
      <SearchFeedDetail query={query!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
