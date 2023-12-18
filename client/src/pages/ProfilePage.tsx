import UserFeed from "@/components/Feed/UserFeed";
import ProfileTop from "@/components/Profile/ProfileTop";
import { storage } from "@/global/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const userIdFromParams = searchParams.get("id");
  const localUserData = storage.get("currentUser");

  if (!localUserData && !userIdFromParams) {
    toast.error("로그인 필요");
    window.location.href = "/login";
  }

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (localUserData) {
      setCurrentUserId(JSON.parse(localUserData).userId);
    }
    if (userIdFromParams) {
      setCurrentUserId(userIdFromParams);
    }
  }, [localUserData, userIdFromParams]);

  if (!currentUserId) {
    return "loading...";
  }

  return (
    <>
      <ProfileTop userId={currentUserId} />
      <UserFeed userId={currentUserId} />
    </>
  );
}
