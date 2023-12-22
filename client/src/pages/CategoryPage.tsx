import CategoryFeed from "@/components/Feed/CategoryFeed";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const params = useParams();

  return (
    <>
      {params.id && <CategoryFeed category={params.id} />}
      <Navbar />
    </>
  );
}
