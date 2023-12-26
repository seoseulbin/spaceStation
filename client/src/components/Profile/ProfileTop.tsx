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
import * as M from "../common/hooks/useCustomDialog.styles";
import { useCustomDialog } from "../common/hooks/useCustomDialog";

export default function ProfileTop({ userId }: { userId: string }) {
  return (
    <ApiBoundary>
      <ApiComponent userId={userId} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: { userId: string }) {
  const [followState, setIsFollowState] = useState(false);
  const localUserData = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const { follows } = useFollow(userId);
  const { user } = useUser(userId);
  const {
    BasicModalLayout,
    opacity,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    isOpen,
  } = useCustomDialog();

  const handleHeaderNavigate = () => {
    navigate("/profile/setting");
  };

  return (
    <>
      <M.BasicModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <BasicModalLayout title={followState ? "팔로워" : "팔로잉"}>
            <FollowModal
              followList={followState ? follows?.follower : follows?.following}
              followState={followState}
              onClickCallback={() => toggleDialog()}
            />
          </BasicModalLayout>
        }
      ></M.BasicModal>

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

      <S.Container>
        <div className="profileContainer">
          <S.ProfileImg src={user?.profileImgUrl} />
          <div>
            <S.Follow>
              <S.Following
                onClick={() => {
                  setIsFollowState(true);
                  toggleDialog();
                }}
              >
                <span>{follows?.follower?.length}</span> 팔로워
              </S.Following>
              <S.Following
                onClick={() => {
                  setIsFollowState(false);
                  toggleDialog();
                }}
              >
                <span>{follows?.following?.length}</span> 팔로잉
              </S.Following>
            </S.Follow>
            {localUserData && JSON.parse(localUserData).userId === userId ? (
              <NavLink to={PATH.profileUpdate}>
                <input type="button" className="update" value={"프로필 수정"} />
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
