import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./Profile.styles";
import FollowModal from "./FollowModal";
import toast from "react-hot-toast";
import { useFollow } from "./Follow.hooks";
import { useUser } from "./User.hooks";

export default function ProfileTop({ userId }: { userId: string }) {
  const localUserData = localStorage.getItem("currentUser");

  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followState, setIsFollowState] = useState(false);

  const {
    follows,
    checkFollow,
    deleteFollow,
    postFollow,
    isLoading,
    isError,
    error,
  } = useFollow(userId);
  const { user } = useUser(userId);

  if (isLoading) return "loading...";
  if (isError) return error.message;

  const handleFollowModalOpen = (state: boolean) => {
    setIsFollowModalOpen(true);
    setIsFollowState(state);
  };

  const renderFollowButton = () => {
    if (!localUserData) {
      return (
        <S.Button
          type="button"
          value="팔로우"
          onClick={() => {
            toast.error("팔로우하려면 로그인해주세요");
          }}
        />
      );
    }

    if (localUserData && JSON.parse(localUserData).userId === userId) {
      return (
        <Link to="/profile/update">
          {" "}
          <S.Button type="button" value={"프로필 수정"} />
        </Link>
      );
    }

    if (!checkFollow) {
      return (
        <S.Button
          type="button"
          value="팔로우"
          onClick={async () => {
            const res = await postFollow({
              follower: userId,
            });
            console.log(res);
          }}
        />
      );
    }

    if (checkFollow) {
      return (
        <S.Button
          type="button"
          value="팔로우 취소"
          onClick={async () => {
            const res = await deleteFollow(userId);
            console.log(res);
          }}
        />
      );
    }
  };

  const ProfileButtons = () => <div>{renderFollowButton()}</div>;

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
            <ProfileButtons />
          </div>
        </div>
      </S.Container>
    </>
  );
}
