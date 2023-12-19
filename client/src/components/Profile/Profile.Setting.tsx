import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, storageKeys } from "../../global/storage";

import { AnchorButton } from "../common/AnchorButton/AnchorButton.styles";
import * as S from "./Profile.Setting.styles";
import { theme } from "@/global/styles/theme";
import { FiLogOut, FiUserX } from "react-icons/fi";

import { PATH } from "@/global/constants";
import { useProfileSetting } from "./Profile.Setting.hooks";

function ProfileSetting() {
  const { logout, withdraw } = useProfileSetting();
  const navigate = useNavigate();

  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    const localUserData = storage.get(storageKeys.currentUser);
    if (!localUserData) {
      navigate(PATH.login);
      return;
    }
    setLocalStorageData(localUserData);
  }, [localStorageData, navigate]);

  return (
    <S.Container>
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
