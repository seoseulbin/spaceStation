import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as S from "./Like.styles";
import { useLikes } from "./Like.hooks";
import { FeedType } from "../Feed/Feed.type";
import { storage } from "@/global/storage";

export default function Like({ feedId }: { feedId: FeedType["_id"] }) {
  const userInfo = storage.get("currentUser");
  const navigate = useNavigate();
  const {
    likes,
    postLike,
    deleteLike,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useLikes(feedId);

  const [heart, setHeart] = useState<boolean | undefined>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const handleLikeButton = async (e: React.MouseEvent<HTMLDivElement>) => {
    const targetFeedId = e.currentTarget.id;

    if (!userInfo) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    }

    if (!heart) {
      await postLike(targetFeedId).then(() => {
        setHeart(!heart);
      });
    }
    if (heart) {
      await deleteLike(targetFeedId).then(() => {
        setHeart(!heart);
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      setCurrentUserId(JSON.parse(userInfo).userId);
      console.log(currentUserId);
    }

    if (isSuccess || isFetching) {
      const isMyLike = likes?.some((like) => like.userId === currentUserId);

      setHeart(isMyLike);
    }
  }, [isLoading, isFetching, isSuccess, likes, currentUserId, userInfo]);

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <S.Container>
      <S.heartButtonDiv>
        <S.heartButton id={feedId} onClick={handleLikeButton}>
          {heart && <FaHeart color="red" />}
          {!heart && <FaRegHeart />}
        </S.heartButton>
        <S.likesNumDiv>
          {likes?.length === 0 && ""}
          {likes?.length !== 0 && `좋아요 ${likes?.length} 개`}
        </S.likesNumDiv>
      </S.heartButtonDiv>
    </S.Container>
  );
}
