import { useFollow } from "./Follow.hooks";
import * as S from "./Profile.styles";

const userid = "657ae3e09566ca0e802a2676";

export default function Follow() {
  const { follows, isLoading, isError, error } = useFollow(userid);

  if (isLoading) return "loading...";
  if (isError) return error.message;
  const following = follows?.follower;
  return (
    <>
      {following!.map((follow) => (
        <S.Container key={follow._id}>${follow._id}</S.Container>
      ))}
    </>
  );
}
