import ProfileFeedDetail from "@/components/Feed/ProfileFeeds/ProfileFeedDetail";
import MainHeader from "@/components/Header/MainHeader";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";

export default function ProfileFeedDetailPage() {
  const { userId, cursor } = useParams();

  return (
    <>
      <MainHeader />
      <ProfileFeedDetail userId={userId!} cursor={Number(cursor!)} />
      <Navbar />
    </>
  );
}
