import { useState } from "react";

import * as S from "./Profile.styles";
import FollowModal from "../Follow/FollowModal";

import { useFollow } from "../Follow/Follow.hooks";
import { useUser } from "../User/User.hooks";
import FollowButton from "../Follow/FollowButton";
import { Link } from "react-router-dom";

export default function ProfileTop({ userId }: { userId: string }) {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followState, setIsFollowState] = useState(false);
  const localUserData = localStorage.getItem("currentUser");

  const { follows, isLoading, isError, error } = useFollow(userId);
  const { user } = useUser(userId);

  if (isLoading) return "loading...";
  if (isError) return error.message;

  const handleFollowModalOpen = (state: boolean) => {
    setIsFollowModalOpen(true);
    setIsFollowState(state);
  };
  const HandlerFollowButton = () => {
    if (localUserData && JSON.parse(localUserData).userId === userId) {
      return (
        <Link to="/profile/update">
          <input type="button" value={"프로필 수정"} />
        </Link>
      );
    }
    return <FollowButton currentUserId={userId} />;
  };
  const ProfileButton = () => <div>{HandlerFollowButton()}</div>;

  return (
    <>
      <S.Container>
        <div>{user?.nickname}</div> {/*헤더에 들어가는 값*/}
        <FollowModal
          followList={followState ? follows?.follower : follows?.following}
          followState={followState}
          isOpen={isFollowModalOpen}
          onClose={() => setIsFollowModalOpen(false)}
        />
        <div className="profileContainer">
          <S.ProfileImg src={user?.profileImgUrl} />
          <div>
            <S.Follow>
              <S.Following onClick={() => handleFollowModalOpen(true)}>
                <span>{follows?.follower?.length}</span> 팔로워
              </S.Following>
              <S.Following onClick={() => handleFollowModalOpen(false)}>
                <span>{follows?.following?.length}</span> 팔로잉
              </S.Following>
            </S.Follow>
            <ProfileButton />
          </div>
        </div>
      </S.Container>
    </>
  );
}
