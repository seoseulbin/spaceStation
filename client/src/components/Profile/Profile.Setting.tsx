import { Navigate } from "react-router-dom";
import { storage, storageKeys } from "../../global/storage";

import { AnchorButton } from "../common/AnchorButton/AnchorButton.styles";
import * as S from "./Profile.Setting.styles";
import { theme } from "@/global/styles/theme";
import { FiLogOut, FiUserX } from "react-icons/fi";

import { PATH } from "@/global/constants";
import { useProfileSetting } from "./Profile.Setting.hooks";

import Header from "../Header/Header";

function ProfileSetting() {
  const { logout, withdraw } = useProfileSetting();
  const currentUser = storage.get(storageKeys.currentUser);
  if (!currentUser) return <Navigate replace to={PATH.login} />;

  return (
    <S.Container>
      <Header backArrow={true} headerTitle="설정" />
      <div>프로필 설정 페이지</div>
      <S.ListContainer>
        <S.ListItem>
          <FiLogOut size={24} color={theme.colors.textPrimary} />
          <AnchorButton
            href={undefined}
            onClick={async () => await logout()}
            children="로그아웃"
          />
        </S.ListItem>
        <S.ListItem className="withdraw">
          <FiUserX size={24} color={theme.colors.textPrimary} />
          <AnchorButton
            onClick={async () => await withdraw()}
            href={undefined}
            children="회원탈퇴"
          />
        </S.ListItem>
      </S.ListContainer>
    </S.Container>
  );
}

export default ProfileSetting;
