import * as S from "./User.styles";
import { useUser } from "./User.hooks";
import { NavLink } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";
import { PATH } from "@/global/constants";

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
    <NavLink to={`${PATH.profile}?id=${userId}`}>
      <S.UserContainer>
        <S.ProfileImg src={user?.profileImgUrl} />
        <span>{user?.nickname} </span>
      </S.UserContainer>{" "}
    </NavLink>
  );
}
