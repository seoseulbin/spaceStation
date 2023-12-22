import ProfileUpdate from "@/components/Profile/ProfileUpdate";
import { PATH } from "@/global/constants";
import { storage, storageKeys } from "@/global/storage";
import { Navigate } from "react-router-dom";

export default function ProfileUpdatePage() {
  const currentUser = storage.get(storageKeys.currentUser);
  if (!currentUser) return <Navigate replace to={PATH.login} />;

  return (
    <>
      <ProfileUpdate userInfo={currentUser} />
    </>
  );
}
