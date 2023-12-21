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

  const handleHeaderNavigate = () => {
    //TODO: 본인일 경우 settings 화면으로, 아닐 경우 신고하기로 해야함
    //현재는 profile setting로 넘어감
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
      <Header
        backArrow={true}
        headerTitle={userNickname}
        isFunctionAcitve={true}
        functionIconType={"dots"}
        onClickFunction={handleHeaderNavigate}
      />
      <ProfileTop userId={currentUserId} />
      <UserFeed userId={currentUserId} />
      <Navbar />
    </>
  );
}
