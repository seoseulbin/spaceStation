import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as S from "./Like.styles";
import { useLikes } from "./Like.hooks";
import { FeedType } from "../Feed.type";
import { storage } from "@/global/storage";
import { PATH } from "@/global/constants";
import ApiBoundary from "@/components/common/ApiBoundary";

type Props = { feedId: FeedType["_id"] };

export default function Like(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ feedId }: Props) {
  const navigate = useNavigate();
  const { likes, postLike, deleteLike } = useLikes(feedId);
  const currentUser = storage.get("currentUser");
  const isLiked = likes.some((like) => like.userId === currentUser?.userId);

  let isFetching = false;
  const handleLikeButton = async () => {
    if (isFetching) return;

    isFetching = true;

    if (!currentUser) {
      toast.error("로그인이 필요합니다.");
      isFetching = false;
      navigate(PATH.login);
      return;
    }

    isLiked ? await deleteLike(feedId) : await postLike(feedId);

    isFetching = false;
  };

  return (
    <S.Container>
      <S.heartButtonDiv>
        <S.heartButton id={feedId} onClick={handleLikeButton}>
          {isLiked && <FaHeart color="red" />}
          {!isLiked && <FaRegHeart />}
        </S.heartButton>
        <S.likesNumDiv>
          {likes.length !== 0 && `좋아요 ${likes.length} 개`}
        </S.likesNumDiv>
      </S.heartButtonDiv>
    </S.Container>
  );
}
