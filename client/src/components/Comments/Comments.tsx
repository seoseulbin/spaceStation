import { useState, ChangeEvent, FormEvent } from "react";
import { useComment } from "./Comments.hooks";
import CommentItem from "./CommentItems";
import * as S from "./Comments.styles";

interface CommentProps {
  feedIds: string[];
}

export default function Comment({ feedIds }: CommentProps) {
  //선택한 피드를 추적 / 선택된 피드가 없으면 null
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(
    feedIds && feedIds.length ? feedIds[0] : null,
  );

  const { comments, postComment, deleteComment, isLoading, isError, error } =
    useComment(selectedFeedId);
  const [comment, setComment] = useState<string>("");
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const onCancel = () => {
    setShowCommentInput(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedFeedId) {
        console.error("선택된 피드가 없습니다.");
        return;
      }

      //비어있으면 전송 X
      if (comment.trim() === "") {
        return;
      }

      //댓글 내용 불러오기
      await postComment({
        content: comment,
        userId: "657ad316527f73fdac869c9e",
        feedId: selectedFeedId,
        createdAt: new Date(),
      });

      //게시한 후 비워주기
      setComment("");
    } catch (err) {
      console.error("게시 오류", err);
    }
  };

  const onDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (err) {
      console.error("댓글 삭제 에러:", err);
    }
  };

  const selectFeedId = (feedId: string) => {
    //이전 상태(prev)가 현재 feedId와 동일한지 확인
    setSelectedFeedId((prev) => (prev === feedId ? prev : feedId));

    //댓글창 토글 키기
    setShowCommentInput(true);
  };

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <S.FeedContainer>
      {/*나중에 feed와 연결하면 지울 버튼 로직입니다*/}
      {feedIds &&
        feedIds.map((feedId) => (
          <S.FeedCommentButton
            key={feedId}
            onClick={() => selectFeedId(feedId)}
          >
            feed:{feedId} 댓글모음
          </S.FeedCommentButton>
        ))}

      {showCommentInput && (
        <S.CommentWindowContainer>
          {comments &&
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                item={comment}
                onDelete={onDeleteComment}
              />
            ))}
          <S.InputWrapper onSubmit={onSubmit}>
            <S.InputField
              type="text"
              placeholder="댓글달기..."
              name="contentInfo"
              value={comment}
              onChange={onChange}
            />

            {comment && <S.SubmitButton type="submit">SEND</S.SubmitButton>}
          </S.InputWrapper>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
        </S.CommentWindowContainer>
      )}
    </S.FeedContainer>
  );
}
