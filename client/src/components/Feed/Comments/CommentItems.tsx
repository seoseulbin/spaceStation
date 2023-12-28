import * as S from "./Comments.styles";
import { CommentType } from "./Comments.type";
import User from "../../User/User";
import { storage } from "../../../global/storage";
import CommentLike from "./CommentLike/CommentLike";
interface CommentItemProps {
  item: CommentType;
  feedUserId: string;
  onDelete: (commentId: string) => void;
  flash: boolean;
}

const currentUser = storage.get("currentUser");

const CommentItem = ({
  item,
  feedUserId,
  onDelete,
  flash,
}: CommentItemProps) => {
  // console.log('Flash prop:', flash);
  return (
    <>
      <S.Container flash={flash}>
        <S.UserInfo>
          {/* 유저의 프로필과 이름 => useritem 에서 사용 */}
          <User userId={item.userId} />
          <S.CommentDate>{timeAgo(item.createdAt)}</S.CommentDate>
        </S.UserInfo>

        <S.CommentBoxOut>
          <S.CommentBoxIn>
            <S.Comment>{item.content}</S.Comment>
            {(item.userId === currentUser?.userId ||
              currentUser?.userId === feedUserId) && (
              <S.DeleteButton onClick={() => onDelete(item._id)}>
                삭제
              </S.DeleteButton>
            )}
          </S.CommentBoxIn>
          <CommentLike commentId={item._id} />
        </S.CommentBoxOut>
      </S.Container>
    </>
  );
};

/**
 * 댓글 올린 시간을 몇분 전으로 표시
 */

function timeAgo(date: string): string {
  const currentDate: Date = new Date();
  const commentDate: Date = new Date(date);

  const timeDifferenceInSeconds: number = Math.floor(
    (currentDate.getTime() - commentDate.getTime()) / 1000,
  );

  const seconds: number = timeDifferenceInSeconds % 60;
  const minutes: number = Math.floor(timeDifferenceInSeconds / 60) % 60;
  const hours: number = Math.floor(timeDifferenceInSeconds / 3600) % 24;
  const days: number = Math.floor(timeDifferenceInSeconds / (3600 * 24));

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else if (seconds > 0) {
    return `${seconds}초 전`;
  } else {
    return "방금 전";
  }
}

export default CommentItem;
