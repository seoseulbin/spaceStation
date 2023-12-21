import UserFeed from "@/components/Feed/UserFeed";
import Navbar from "@/components/Navbar/Navbar";
import ProfileTop from "@/components/Profile/ProfileTop";
import { storage } from "@/global/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userIdFromParams = searchParams.get("id");
  const localUserData = storage.get("currentUser");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | undefined>();
  const [isMyId, setIsMyId] = useState(true);

  const handleHeaderNavigate = () => {
    navigate("/profile/setting");
  };

  useEffect(() => {
    if (localUserData) {
      const userInfo = JSON.parse(localUserData);
      setCurrentUserId(userInfo.userId);
      setUserNickname(userInfo.nickname);
    }
    if (userIdFromParams) {
      setCurrentUserId(userIdFromParams);
      setIsMyId(!isMyId);
    }

    if (!localUserData && !userIdFromParams) {
      toast.error("로그인 필요");
      navigate("/login");
    }
  }, [localUserData, navigate, userIdFromParams, isMyId]);

  if (!currentUserId) {
    return "loading...";
  }

  return (
    <>
      <Header
        backArrow={true}
        headerTitle={userNickname}
        isFunctionAcitve={isMyId}
        functionIconType={"setting"}
        onClickFunction={handleHeaderNavigate}
      />
      <ProfileTop userId={currentUserId} />
      <UserFeed userId={currentUserId} />
      <Navbar />
    </>
  );
}
