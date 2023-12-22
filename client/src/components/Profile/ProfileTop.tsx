import { useState } from "react";
import * as S from "./Profile.styles";
import FollowModal from "../Follow/FollowModal";
import { useFollow } from "../Follow/Follow.hooks";
import { useUser } from "../User/User.hooks";
import FollowButton from "../Follow/FollowButton";
import { NavLink, useNavigate } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";
import { PATH } from "@/global/constants";
import Header from "../Header/Header";

import { AiOutlineClose } from "react-icons/ai";

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
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);
  const { follows } = useFollow(userId);
  const { user } = useUser(userId);
  const handleHeaderNavigate = () => {
    navigate("/profile/setting");
  };

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  const handleFollowModalOpen = (state: boolean) => {
    setIsFollowModalOpen(!isFollowModalOpen);
    setIsFollowState(state);
  };

  return (
    <>
      <S.Container>
        <S.StyledModal
          isOpen={isFollowModalOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onBackgroundClick={() => setIsFollowModalOpen(false)}
          onEscapeKeydown={() => setIsFollowModalOpen(false)}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <AiOutlineClose
            className="close"
            onClick={() => setIsFollowModalOpen(false)}
          />
          <FollowModal
            followList={followState ? follows?.follower : follows?.following}
            followState={followState}
          />
        </S.StyledModal>
        <Header
          backArrow={true}
          headerTitle={user.nickname}
          isFunctionAcitve={
            localUserData && JSON.parse(localUserData).userId === userId
              ? true
              : false
          }
          functionIconType={"setting"}
          onClickFunction={handleHeaderNavigate}
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
              <NavLink to={PATH.profileUpdate}>
                <input type="button" value={"프로필 수정"} />
              </NavLink>
            ) : (
              <FollowButton userId={userId} />
            )}
          </div>
        </div>
      </S.Container>
    </>
  );
}
