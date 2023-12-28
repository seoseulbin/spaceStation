import { ChangeEvent, useState } from "react";
import { useUser } from "../User/User.hooks";
import * as S from "./Profile.styles";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";
import Header from "../Header/Header";
import { storage } from "@/global/storage";

type Props = {
  userInfo: { userId: string; nickname: string };
};

type UpdateProfileData = {
  nickname: string;
  profileImgUrl: string;
};

export default function ProfileUpdate(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ userInfo: { userId, nickname } }: Props) {
  const navigate = useNavigate();
  const { user, putUser } = useUser(userId);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newProfileImgUrl, setNewProfileImgUrl] = useState<string | undefined>(
    user.profileImgUrl,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const imageUploader = async (file: File) => {
    try {
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
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    setNewProfileImgUrl(file ? URL.createObjectURL(file) : undefined);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleProfileImageClick = () => {
    // 파일 선택 창 열기
    const fileInput = document.getElementById("profileImageInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpdateProfile = async () => {
    try {
      let uploadedUrl = newProfileImgUrl;

      // 이미지가 선택되어 있을 경우에만 클라우드니어리에 업로드
      if (selectedFile) {
        uploadedUrl = await imageUploader(selectedFile);
        setNewProfileImgUrl(uploadedUrl);
      }

      const updateData: UpdateProfileData = {
        nickname: newNickname,
        profileImgUrl: uploadedUrl ? uploadedUrl : "/default1.png",
      };
      storage.set("currentUser", { userId, nickname: newNickname });
      // 프로필 업데이트 요청
      if (newNickname != "") {
        await putUser(updateData);
        storage.set("currentUser", { userId, nickname: newNickname });

        // 성공적으로 업데이트되면 다시 사용자 정보를 가져오기
        toast.success("프로필 업데이트 성공");
        setTimeout(() => {
          navigate("/profile");
        }, 400);
      } else toast.error("닉네임을 입력해주세요");
    } catch (error) {
      throw new Error(`Error updating profile: ${error}`);
    }
  };

  return (
    <>
      <Header
        backArrow={true}
        headerTitle="프로필 변경"
        isFunctionAcitve={true}
        functionIconType="save"
        onClickFunction={handleUpdateProfile}
      />
      <S.Container>
        <input
          type="file"
          id="profileImageInput"
          onChange={fileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <S.ProfileImg
          className="profileImageEditCamera2"
          src={newProfileImgUrl || user?.profileImgUrl}
          alt="프로필 이미지"
          onClick={handleProfileImageClick}
        />
        <S.UpdateInput
          value={newNickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
        />
      </S.Container>
    </>
  );
}
