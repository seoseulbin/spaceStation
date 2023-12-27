import * as S from "./Follow.styles";
import { useUser } from "../User/User.hooks";
import { NavLink } from "react-router-dom";
import ApiBoundary from "../common/ApiBoundary";
import { PATH } from "@/global/constants";

type Props = { userId: string; onClickCallback: () => void };

export default function FollowItem(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId, onClickCallback }: Props) {
  const { user } = useUser(userId);

  return (
    <NavLink to={`${PATH.profile}?id=${userId}`} onClick={onClickCallback}>
      <S.UserContainer>
        <S.ProfileImg src={user?.profileImgUrl} />
        <span>{user?.nickname} </span>
      </S.UserContainer>
    </NavLink>
  );
}
