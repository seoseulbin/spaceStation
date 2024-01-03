import { FallbackProps } from "react-error-boundary";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { PATH } from "@/global/constants";
import profileSettingAPI from "../Profile/Profile.Setting.api";
import { storage, storageKeys } from "@/global/storage";
import * as S from "./ApiErrorFallback.styles";

export default function ApiErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    toast.error("유효하지 않은 사용자입니다. 다시 로그인해주세요.");
    profileSettingAPI.logout();
    storage.remove(storageKeys.currentUser);
    return <Navigate to={PATH.login} />;
  }

  return (
    <>
      {/* TODO: 스타일링 */}
      <S.Container>
        <S.RequestFailedImg src="/requestFail.png" />
        요청에 실패했습니다.
        <button onClick={() => resetErrorBoundary()}>재시도</button>
      </S.Container>
    </>
  );
}
