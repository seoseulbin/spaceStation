import { useState } from "react";

import * as S from "./Profile.styles";
import FollowModal from "../Follow/FollowModal";

import { useFollow } from "../Follow/Follow.hooks";
import { useUser } from "../User/User.hooks";
import FollowButton from "../Follow/FollowButton";
import { Link } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";

export default function ProfileTop({ userId }: { userId: string }) {
  return (
    <ApiBoundary>
      <ApiComponent userId={userId} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: { userId: string }) {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followState, setIsFollowState] = useState(false);
  const localUserData = localStorage.getItem("currentUser");

  const { follows } = useFollow(userId);
  const { user } = useUser(userId);

  const handleFollowModalOpen = (state: boolean) => {
    setIsFollowModalOpen(true);
    setIsFollowState(state);
  };

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
            {localUserData && JSON.parse(localUserData).userId === userId ? (
              <Link to="/profile/update">
                <input type="button" value={"프로필 수정"} />
              </Link>
            ) : (
              <FollowButton userId={userId} />
            )}
          </div>
        </div>
      </S.Container>
    </>
  );
}
