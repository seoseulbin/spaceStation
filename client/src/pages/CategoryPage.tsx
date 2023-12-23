import CategoryFeed from "@/components/Feed/CategoryFeed";
import { useParams } from "react-router-dom";
import Header from "@/components/Header/Header";

export default function CategoryPage() {
  const params = useParams();

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
      {params.id && <CategoryFeed category={params.id} />}
    </>
  );
}
