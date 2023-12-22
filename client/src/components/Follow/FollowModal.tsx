import { FollowType } from "./Follow.type";
import * as S from "./Follow.styles";
import FollowItem from "./FollowItem";

type FollowModalProps = {
  followList?: FollowType[];
  followState: boolean;
  // 다른 필요한 props 추가
};

export default function FollowModal({
  followList,
  followState,
}: FollowModalProps) {
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
        <FollowItem userId={follow.following} key={follow._id} />
      ));
    }
    return followList!.map((follow) => (
      <FollowItem userId={follow.follower} key={follow._id} />
    ));
  }

  return (
    <>
      <S.Container>{itemHandler()}</S.Container>
    </>
  );
}
