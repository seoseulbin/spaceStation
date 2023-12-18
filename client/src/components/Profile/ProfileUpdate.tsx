import { ChangeEvent, useState } from "react";
import { useUser } from "./User.hooks";
import * as S from "./Profile.styles";
import toast from "react-hot-toast";
import axios from "axios";
import { storage } from "@/global/storage";
import { useNavigate } from "react-router-dom";

type UpdateProfileData = {
  nickname: string;
  profileImgUrl: string;
};

export default function ProfileUpdate() {
  const localUserData = storage.get("currentUser");
  const userid = localUserData ? JSON.parse(localUserData).userId : null;
  const navigate = useNavigate();
  const { user, putUser, isLoading, isError, error } = useUser(
    userid as string,
  );
  const [newNickname, setNewNickname] = useState<string>(user?.nickname || "");
  const [newProfileImgUrl, setNewProfileImgUrl] = useState<string | undefined>(
    user?.profileImgUrl,
  );

  if (isLoading) return "loading...";
  if (isError) {
    toast.error("잘못된 접근입니다");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    return error.message;
  }

  /**
   * cloudinary 이미지 저장 함수
   */
  const imageUploader = async (file: File) => {
    try {
      // cloudinary 필요한 정보
      const {
        VITE_CLOUDINARY_PRESET_NAME,
        VITE_CLOUDINARY_NAME,
        VITE_CLOUDINARY_API_KEY,
      } = import.meta.env;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", VITE_CLOUDINARY_PRESET_NAME);
      formData.append("api_key", VITE_CLOUDINARY_API_KEY);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_NAME}/image/upload`,
        formData,
        { headers: { "content-type": "multipart/form-data" } },
      );

      return response.data.url; // 이미지 URL 받아오기
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
      throw error;
    }
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files?.[0]) {
        throw new Error("이미지 파일이 없습니다.");
      }
      const uploadedUrl = await imageUploader(e.target.files[0]);
      setNewProfileImgUrl(uploadedUrl);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error("이미지 업로드 실패");
      } else {
        console.log(String(error));
      }
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
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
      <input
        type="file"
        onChange={fileChange}
        accept="image/*"
        // placeholder는 file input에서는 지원되지 않습니다.
      />
      <S.ProfileImg
        className="profileImageEditCamera2"
        src={newProfileImgUrl || user?.profileImgUrl}
        alt="프로필 이미지"
        onClick={() => {}}
      />
      <S.UpdateInput
        value={newNickname}
        onChange={handleNicknameChange}
        placeholder="닉네임을 입력하세요"
      />

      <S.Upload onClick={handleUpdateProfile}>업로드</S.Upload>
    </S.Container>
  );
}
