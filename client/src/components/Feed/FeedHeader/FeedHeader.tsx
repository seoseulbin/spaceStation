import { useState } from "react";
import FeedOption from "../FeedOption/FeedOption";
import * as S from "./FeedHeader.styles";
import { HiDotsHorizontal } from "react-icons/hi";
import User from "../../User/User";
import FollowButton from "../../Follow/FollowButton";

export default function FeedHeader({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <div className="user">
          <User userId={userId} />
          <FollowButton userId={userId} />
        </div>
        <HiDotsHorizontal onClick={() => openOption()} />
        <FeedOption
          feedId={feedId}
          currentUserId={userId}
          isOpen={isOpen}
          closeOption={closeOption}
        />
      </S.FeedHeader>
    </>
  );
}
