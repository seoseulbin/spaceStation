import BookmarkFeedOverview from "@/components/Feed/BookmarkFeeds/BookmarkFeedOverview";
import ProfileFeed from "@/components/Feed/ProfileFeeds/ProfileFeedOverview";
import Navbar from "@/components/Navbar/Navbar";
import ProfileTop from "@/components/Profile/ProfileTop";
import { PATH } from "@/global/constants";
import { storage } from "@/global/storage";
import { NavLink, Navigate, useSearchParams } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const userIdFromParams = searchParams.get("id");
  const isMyBookmark = searchParams.get("is-bookmark");
  const currentUser = storage.get("currentUser");

  const userId = userIdFromParams || currentUser?.userId;
  if (!userId) return <Navigate to={PATH.login} />;

  return (
    <>
      <ProfileTop userId={userId} />
      <NavLink to={`${PATH.profile}`}>피드</NavLink>
      <NavLink to={`${PATH.profile}?is-bookmark=true`}>북마크</NavLink>
      {isMyBookmark ? (
        <BookmarkFeedOverview />
      ) : (
        <ProfileFeed userId={userId} />
      )}

      <Navbar />
    </>
  );
}
