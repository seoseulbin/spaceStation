import * as S from "./User.styles";
import { useUser } from "./User.hooks";
import { Link } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";

export default function User({ userId }: { userId: string }) {
  return (
    <ApiBoundary>
      <ApiComponent userId={userId} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: { userId: string }) {
  const { user } = useUser(userId);

  return (
    <Link to={`/profile?id=${userId}`}>
      <S.UserContainer>
        <S.ProfileImg src={user?.profileImgUrl} />
        <span>{user?.nickname} </span>
      </S.UserContainer>{" "}
    </Link>
  );
}
