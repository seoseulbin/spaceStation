import CategoryFeed from "@/components/Feed/CategoryFeed";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

export default function CategoryPage() {
  const params = useParams();

  return (
    <Layout>
      {params.id && <CategoryFeed category={params.id} />}
      <Navbar />
    </Layout>
  );
}
