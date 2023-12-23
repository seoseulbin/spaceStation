import * as S from "./FeedHeader.styles";
import User from "../../User/User";
import FollowButton from "../../Follow/FollowButton";
import { FeedOptionModal } from "@/components/Feed/FeedOption/FeedOptionModal";

export default function FeedHeader({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) {
  return (
    <>
      <S.FeedHeader>
        <div className="user">
          <User userId={userId} />
          <FollowButton userId={userId} />
        </div>
        <FeedOptionModal feedId={feedId} userId={userId} />
      </S.FeedHeader>
    </>
  );
}
