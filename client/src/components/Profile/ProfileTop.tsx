import { useFollow } from "./Follow.hooks";
import { useUser } from "./User.hooks";
import * as S from "./Profile.styles";

let temp = 0;
const userid = "657ae3e09566ca0e802a2676"; //쿼리스트링으로 받아와야 하는 값
//내 프로필인지 다른 사람 프로필인지에 대한 분기 처리 필요
//테스트 ui 컴포넌트 분리 필요

export default function ProfileTop() {
  const { follows, deleteFollow, postFollow, isLoading, isError, error } =
    useFollow(userid);
  const { user } = useUser(userid);
  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      <S.ProfileImg src={user?.profileImgUrl} />
      {user?.nickname}
      <S.Follow>
        <S.Following>
          <span> {follows?.follower?.length}</span> 팔로워
        </S.Following>

        <S.Following>
          <span>{follows?.following?.length}</span> 팔로잉
        </S.Following>
      </S.Follow>
      <button
        onClick={async () => {
          //TODO: 만약 me라면 프로필 수정 페이지로 넘어가는 버튼
          if (temp == 0) {
            //temp 임시로 넣어놇음 checkfollow로 확인필요
            const res = await postFollow({
              follower: userid,
            });
            console.log(res);
            temp = 1;
          } else {
            const res = await deleteFollow(userid);
            console.log(res);
            temp = 0;
          }
        }}
      >
        {temp == 0 ? "팔로우" : "팔로우취소"}
      </button>
    </>
  );
}
