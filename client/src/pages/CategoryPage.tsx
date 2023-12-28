import Category from "@/components/Feed/Category/Category";
import CategoryFeed from "@/components/Feed/CategoryFeeds/CategoryFeedOverview";
import MainHeader from "@/components/Header/MainHeader";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { categoryId } = useParams();

  return (
    <>
      <MainHeader />
      <Category categoryId={categoryId!} />
      <CategoryFeed categoryId={categoryId!} />
    </>
  );
}
