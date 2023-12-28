import SearchFeedDetail from "@/components/Search/SearchFeedDetail";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Header from "@/components/Header/Header";

export default function SearchFeedDetailPage() {
  const { query, cursor } = useParams();

  return (
    <>
      <Header backArrow={true} headerTitle={query} />
      <SearchFeedDetail query={query!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
