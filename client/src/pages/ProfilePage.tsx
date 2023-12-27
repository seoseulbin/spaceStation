import BookmarkFeedOverview from "@/components/Feed/BookmarkFeeds/BookmarkFeedOverview";
import UserFeed from "@/components/Feed/ProfileFeeds/ProfileFeedOverview";
import Navbar from "@/components/Navbar/Navbar";
import ProfileTop from "@/components/Profile/ProfileTop";
import { PATH } from "@/global/constants";
import { storage } from "@/global/storage";
import { NavLink, Navigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div<{ $isActive?: boolean }>`
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 20vw;
  padding-bottom: 2vh;
  text-align: center;
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: none;
`;

const StyledNavLink = styled(NavLink)<{ $isActive?: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.main : theme.colors.textDisable};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
`;

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
      <StyledLayout>
        <NavLinkWrapper to={`${PATH.profile}`}>
          <StyledNavLink to={`${PATH.profile}`} $isActive={!isMyBookmark}>
            피드
          </StyledNavLink>
        </NavLinkWrapper>
        <NavLinkWrapper to={`${PATH.profile}?is-bookmark=true`}>
          <StyledNavLink
            to={`${PATH.profile}?is-bookmark=true`}
            $isActive={!!isMyBookmark}
          >
            북마크
          </StyledNavLink>
        </NavLinkWrapper>
      </StyledLayout>
      {isMyBookmark ? <BookmarkFeedOverview /> : <UserFeed userId={userId} />}
      <Navbar />
    </>
  );
}
