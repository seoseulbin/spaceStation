import ProfileFeedDetail from "@/components/Feed/ProfileFeeds/ProfileFeedDetail";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function ProfileFeedDetailPage() {
  const { userId, cursor } = useParams();

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
      <ProfileFeedDetail userId={userId!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
