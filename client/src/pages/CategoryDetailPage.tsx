import CategoryFeedDetail from "@/components/Feed/CategoryFeeds/CategoryFeedDetail";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function CategoryDetailPage() {
  const { categoryId, cursor } = useParams();

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
      <CategoryFeedDetail categoryId={categoryId!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
