import { useUser } from "./User.hooks";
import { NavLink } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";
import { PATH } from "@/global/constants";
import * as S from "./User.style";

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
      <S.UserProfileContainer>
        <S.UserProfileImage src={user?.profileImgUrl} />
        <S.UserProfileName>{user?.nickname} </S.UserProfileName>
      </S.UserProfileContainer>
    </NavLink>
  );
}
