import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as S from "./Like.styles";
import { useState } from "react";
import { useLikes } from "./Like.hooks";
import { FeedType } from "../Feed/Feed.type";

export default function Like({ feedId }: { feedId: FeedType["_id"] }) {
  const [heart, setHeart] = useState(false);
  const { data, postLike, deleteLike, isLoading, isError, error } =
    useLikes(feedId);

  const handleLikeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetFeedId = e.currentTarget.value;

    if (heart === false) {
      await postLike(targetFeedId);
    } else {
      await deleteLike(targetFeedId);
    }
    setHeart(!heart);
  };

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <S.Container>
      <S.heartButtonDiv>
        <S.heartButton
          value={feedId}
          onClick={handleLikeButton}
        ></S.heartButton>
        {data!.isMyLike && <FaHeart color="red" />}
        {!data!.isMyLike && <FaRegHeart />}
        <S.likesNumDiv>좋아요 {data!.likes.length} 개</S.likesNumDiv>
      </S.heartButtonDiv>
    </S.Container>
  );
}
