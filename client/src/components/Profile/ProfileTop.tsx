import { useFollow } from "./Follow.hooks";
import * as S from "./Profile.styles";

/*
 *  프로필이 내 프로필인지 타인 프로필인지 확인
 */
//   interface ProfileHeaderContainerProps {
//     me: boolean;
// }
let temp = 0;
const userid = "657ae3e09566ca0e802a2676";
export default function ProfileTop() {
  const { follows, deleteFollow, postFollow, isLoading, isError, error } =
    useFollow(userid);
  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      <S.ProfileImg src="../public/profileImg.jpeg" />
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
          if (temp == 0) {
            //임시로 넣어놇음 checkfollow로 확인필요
            const res = await postFollow({
              follower: userid,
              following: "657ae3e09566ca1e801a2654",
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
