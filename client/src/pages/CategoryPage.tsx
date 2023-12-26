import Category from "@/components/Feed/Category/Category";
import CategoryFeed from "@/components/Feed/CategoryFeeds/CategoryFeedOverview";
import Header from "@/components/Header/Header";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { categoryId } = useParams();

  //TODO : 검색 기능 추가
  const handleSearchButton = () => {
    alert("!!?");
  };

  return (
    <>
      <Header
        backArrow={false}
        headerTitle={"Space-station🚉"}
        isFunctionAcitve={true}
        functionIconType={"search"}
        onClickFunction={handleSearchButton}
      />
      <Category categoryId={categoryId!} />
      <CategoryFeed categoryId={categoryId!} />
    </>
  );
}
