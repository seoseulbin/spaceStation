import { useState } from "react";
import { useUser } from "./User.hooks";
import * as S from "./Profile.styles";
import toast from "react-hot-toast";

type UpdateProfileData = {
  nickname: string;
  profileImgUrl: string;
};

export default function ProfileUpdate() {
  const localUserData = localStorage.getItem("currentUser");
  if (!localUserData) {
    toast.error("로그인 필요");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }
  const userid = JSON.parse(localUserData as string).userId;

  const { user, putUser, isLoading, isError, error } = useUser(userid);
  const [newNickname, setNewNickname] = useState<string>(user?.nickname || "");
  const [newProfileImgUrl, setNewProfileImgUrl] = useState<string | undefined>(
    user?.profileImgUrl,
  );

  if (isLoading) return "loading...";
  if (isError) return error.message;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleProfileImgUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewProfileImgUrl(e.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      const updateData: UpdateProfileData = {
        nickname: newNickname,
        profileImgUrl: newProfileImgUrl
          ? newProfileImgUrl
          : "/profile_default_image.jpeg",
      };

      // 프로필 업데이트 요청
      await putUser(updateData);

      // 성공적으로 업데이트되면 다시 사용자 정보를 가져오기
      toast.success("프로필 업데이트 성공");

      setTimeout(() => {
        window.location.href = "/profile";
      }, 400);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <S.Container>
      <S.ProfileImg
        className="profileImageEditCamera2"
        src={user?.profileImgUrl}
        alt="프로필 이미지"
        onClick={() => {}}
      />
      <S.UpdateInput
        value={newNickname}
        onChange={handleNicknameChange}
        placeholder="닉네임을 입력하세요"
      />
      <S.UpdateInput
        value={newProfileImgUrl || ""}
        onChange={handleProfileImgUrlChange}
        placeholder="프로필 이미지 URL을 입력하세요"
      />
      <S.Upload onClick={handleUpdateProfile}>업로드</S.Upload>
    </S.Container>
  );
}
