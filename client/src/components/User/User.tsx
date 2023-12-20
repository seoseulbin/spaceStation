import * as S from "./User.styles";
import { useUser } from "./User.hooks";
import { Link } from "react-router-dom";

export default function User({ currentUserId }: { currentUserId: string }) {
  const { user } = useUser(currentUserId);

  return (
    <Link to={`/profile?id=${currentUserId}`}>
      <S.UserContainer>
        <S.ProfileImg src={user?.profileImgUrl} />
        <span>{user?.nickname} </span>
      </S.UserContainer>{" "}
    </Link>
  );
}
