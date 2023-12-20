// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { useState } from "react";
import Loading from "../common/Loading";
import FeedOption from "../FeedOption/FeedOption";
import { useUser } from "../Profile/User.hooks";
import * as S from "./FeedHeader.styles";
import { HiDotsHorizontal } from "react-icons/hi";

export default function FeedHeader({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) {
  const { user, isLoading, isError, error } = useUser(
    userId, //TODO:userId가 들어가야함, 임시 아이디
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isLoading) return <Loading />;
  if (isError) return error.message;

  const openOption = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };
  const closeOption = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };
  return (
    <>
      <S.FeedHeader>
        <S.UserInfo>
          <S.ProfileImage src={user?.profileImgUrl} />
          <span>{user?.nickname}</span>
        </S.UserInfo>
        <HiDotsHorizontal onClick={() => openOption()} />
      </S.FeedHeader>
      <FeedOption feedId={feedId} isOpen={isOpen} closeOption={closeOption} />
    </>
  );
}
