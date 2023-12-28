import CategoryFeedDetail from "@/components/Feed/CategoryFeeds/CategoryFeedDetail";
import MainHeader from "@/components/Header/MainHeader";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function CategoryDetailPage() {
  const { categoryId, cursor } = useParams();

  return (
    <>
      <MainHeader />
      <CategoryFeedDetail categoryId={categoryId!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
