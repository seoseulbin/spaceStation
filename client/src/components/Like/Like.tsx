import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as S from "./Like.styles";
import { useEffect, useState } from "react";
import { likeAPI } from "./Like.api";

export default function Like() {
  const [heart, setHeart] = useState(false);
  //TODO : 수정필요
  useEffect(() => {
    likeAPI.getLikes("3eqwfw");
  }, []);

  function handleLikeButton() {
    setHeart(!heart);
  }

  return (
    <S.Container>
      <S.heartButton onClick={handleLikeButton}>
        {!heart ? <FaRegHeart /> : <FaHeart color="red" />}
      </S.heartButton>
    </S.Container>
  );
}
