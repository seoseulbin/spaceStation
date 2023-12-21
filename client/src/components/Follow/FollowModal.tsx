import { FollowType } from "./Follow.type";
import User from "../User/User";
import * as S from "./Follow.styles";
import { AiOutlineClose } from "react-icons/ai";

type FollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  followList?: FollowType[];
  followState: boolean;
  // 다른 필요한 props 추가
};

export default function FollowModal({
  isOpen,
  onClose,
  followList,
  followState,
}: FollowModalProps) {
  if (!isOpen) {
    // 모달이 닫혀있을 때는 null을 반환하여 렌더링하지 않음
    return null;
  }
  function itemHandler() {
    if (followList?.length == 0) {
      return followState ? (
        <div>팔로워가 없습니다</div>
      ) : (
        <div>팔로우한 사람이 없습니다</div>
      );
    }
    if (followState) {
      return followList!.map((follow) => (
        <User userId={follow.following} key={follow._id} />
      ));
    }
    return followList!.map((follow) => (
      <User userId={follow.follower} key={follow._id} />
    ));
  }

  return (
    <>
      <S.Container>
        <AiOutlineClose className="close" onClick={onClose} />
        {itemHandler()}
      </S.Container>
    </>
  );
}
