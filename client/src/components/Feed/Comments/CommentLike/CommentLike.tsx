import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as S from "./CommentLike.styles";
import { useCommentLikes } from "./CommentLike.hooks";
import { CommentType } from "../Comments.type";
import { storage } from "@/global/storage";
import { PATH } from "@/global/constants";
import ApiBoundary from "@/components/common/ApiBoundary";
import { theme } from "@/global/styles/theme";
import { FeedType } from "../../Feed.type";

type Props = { commentId: CommentType["_id"]; feedId: FeedType["_id"] };

export default function CommentLike(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ commentId, feedId }: Props) {
  const navigate = useNavigate();
  const { commentLikes, postLike, deleteLike } = useCommentLikes(commentId);
  const currentUser = storage.get("currentUser");
  const isCommentLiked = commentLikes.some(
    (commentLike) => commentLike.userId === currentUser?.userId,
  );

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

    isCommentLiked
      ? await deleteLike(commentId)
      : await postLike({ commentId, feedId });

    isFetching = false;
  };

  return (
    <S.Container>
      <S.heartButtonDiv>
        <S.heartButton id={commentId} onClick={handleLikeButton}>
          {isCommentLiked && <FaHeart size="15" color="red" />}
          {!isCommentLiked && (
            <FaRegHeart color={theme.colors.main} size="15" />
          )}
        </S.heartButton>
      </S.heartButtonDiv>
      <S.likesNumDiv>
        {commentLikes.length !== 0 && `${commentLikes.length}`}
      </S.likesNumDiv>
    </S.Container>
  );
}
