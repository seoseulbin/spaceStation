import * as S from "./Follow.styles";
import { useUser } from "./User.hooks";

export default function FollowItem({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const { user } = useUser(currentUserId);

  return (
    <div className="itemContainer">
      <S.ProfileImg src={user?.profileImgUrl} />
      <span className="nickname">{user?.nickname} </span>
    </div>
  );
}
