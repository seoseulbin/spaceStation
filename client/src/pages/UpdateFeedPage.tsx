import UpdateFeed from "@/components/UpdateFeed/UpdateFeed";
import { useParams } from "react-router-dom";

export default function UpdateFeedPage() {
  const params = useParams();

  return <>{params.id && <UpdateFeed feedId={params.id} />}</>;
}
