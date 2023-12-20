import UserFeed from "@/components/Feed/UserFeed";
import ProfileTop from "@/components/Profile/ProfileTop";
import { storage } from "@/global/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userIdFromParams = searchParams.get("id");
  const localUserData = storage.get("currentUser");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (localUserData) {
      setCurrentUserId(JSON.parse(localUserData).userId);
    }
    if (userIdFromParams) {
      setCurrentUserId(userIdFromParams);
    }

    if (!localUserData && !userIdFromParams) {
      toast.error("로그인 필요");
      navigate("/login");
    }
  }, [localUserData, navigate, userIdFromParams]);

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
