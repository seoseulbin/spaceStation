import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, storageKeys } from "../../global/storage";

import { AnchorButton } from "../common/AnchorButton/AnchorButton.styles";
import * as S from "./Profile.Setting.styles";
import { theme } from "@/global/styles/theme";
import { FiLogOut, FiUserX } from "react-icons/fi";

import toast from "react-hot-toast";
import { PATH } from "@/global/constants";

function ProfileSetting() {
  const logoutURL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`;
  const withdrawURL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/withdraw`;
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

  function removeLocalData(message: string) {
    toast.success(message);
    storage.remove(storageKeys.currentUser);
    setLocalStorageData({});
  }

  function handleWithdraw() {
    const data = {};
    axios
      .post(withdrawURL, data, {
        withCredentials: true,
      })
      .then((response) => {
        removeLocalData(response.data.message);
      });
  }

  function handleLogout() {
    const data = {};
    axios
      .post(logoutURL, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 204) {
          removeLocalData("성공적으로 로그아웃 되었습니다.");
        }
      });
  }

  return (
    <S.Container>
      <div>프로필 설정 페이지</div>
      <S.ListContainer>
        <S.ListItem>
          <FiLogOut size={24} color={theme.colors.textPrimary} />
          <AnchorButton
            href={undefined}
            onClick={handleLogout}
            children="로그아웃"
          />
        </S.ListItem>
        <S.ListItem className="withdraw">
          <FiUserX size={24} color={theme.colors.textPrimary} />
          <AnchorButton
            onClick={handleWithdraw}
            href={undefined}
            children="회원탈퇴"
          />
        </S.ListItem>
      </S.ListContainer>
    </S.Container>
  );
}

export default ProfileSetting;
