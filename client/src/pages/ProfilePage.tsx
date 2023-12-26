import UserFeed from "@/components/Feed/UserFeed";
import Navbar from "@/components/Navbar/Navbar";
import ProfileTop from "@/components/Profile/ProfileTop";
import { PATH } from "@/global/constants";
import { storage } from "@/global/storage";
import { Navigate, useSearchParams } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const userIdFromParams = searchParams.get("id");
  const currentUser = storage.get("currentUser");

  const userId = userIdFromParams || currentUser?.userId;
  if (!userId) return <Navigate to={PATH.login} />;
  return (
    <>
      <ProfileTop userId={userId} />
      <UserFeed userId={userId} />
      <Navbar />
    </>
  );
}
