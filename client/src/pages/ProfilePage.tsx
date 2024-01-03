import BookmarkFeedOverview from "@/components/Feed/BookmarkFeeds/BookmarkFeedOverview";
import ProfileFeed from "@/components/Feed/ProfileFeeds/ProfileFeedOverview";
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
  text-align: center;
`;

const NavLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.deepback};
`;

const StyledNavLink = styled.div<{ $isActive: boolean }>`
  width: 20%;
  height: 50px;
  margin: 0 10px;
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  &:nth-child(1) {
    & a {
      color: ${(props) =>
        props.$isActive === true
          ? "#81b2cc"
          : "${({ theme }) => theme.colors.deepback}"};
    }
    border-bottom: 2px solid
      ${(props) =>
        props.$isActive === true
          ? "#81b2cc"
          : "${({ theme }) => theme.colors.deepback}"};
  }

  &:nth-child(2) {
    & a {
      color: ${(props) =>
        props.$isActive === true
          ? "#e0756a"
          : "${({ theme }) => theme.colors.deepback}"};
    }
    border-bottom: 2px solid
      ${(props) =>
        props.$isActive === true
          ? "#e0756a"
          : "${({ theme }) => theme.colors.deepback}"};
  }
`;

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const userIdFromParams = searchParams.get("id");
  const isMyBookmark = searchParams.get("is-bookmark");
  const currentUser = storage.get("currentUser");

  const userId = userIdFromParams || currentUser?.userId;
  if (!userId) return <Navigate replace to={PATH.login} />;

  return (
    <>
      <ProfileTop userId={userId} />
      {currentUser?.userId == userId ? (
        <StyledLayout>
          <NavLinkWrapper>
            <StyledNavLink $isActive={!isMyBookmark}>
              <NavLink to={`${PATH.profile}`}>피드</NavLink>
            </StyledNavLink>
            <StyledNavLink $isActive={!!isMyBookmark}>
              <NavLink to={`${PATH.profile}?is-bookmark=true`}>북마크</NavLink>
            </StyledNavLink>
          </NavLinkWrapper>
        </StyledLayout>
      ) : null}
      {isMyBookmark ? (
        <BookmarkFeedOverview />
      ) : (
        <ProfileFeed userId={userId} />
      )}
    </>
  );
}
