import UpdateFeed from "@/components/UpdateFeed/UpdateFeed";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

export default function UpdateFeedPage() {
  const params = useParams();

  return <Layout>{params.id && <UpdateFeed feedId={params.id} />}</Layout>;
}
