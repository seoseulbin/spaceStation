import { useState, ChangeEvent, FormEvent } from "react";
import { useComment } from "./Comments.hooks";
import CommentItem from "./CommentItems";
import {
  FeedContainer,
  CommentWindowContainer,
  InputWrapper,
  InputField,
  SubmitButton,
  FeedCommentButton,
  CancelButton,
} from "./Comments.styles";

interface CommentProps {
  feedIds: string[];
}

export default function Comment({ feedIds }: CommentProps) {
  //선택한 피드를 추적 / 선택된 피드가 없으면 null
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(
    feedIds && feedIds.length > 0 ? feedIds[0] : null,
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

      //피드아이디1 => 657bbb1f59008937d6e424b8
      //피드아이디2 => 657ad9c4b22e76aea1ff6bf4

      //댓글 내용 불러오기
      await postComment({
        content: comment,
        userId: "657ad316527f73fdac869c9e",
        feedId: selectedFeedId,
        createdAt: new Date(),
      });
      //console.log(comment);

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
    <FeedContainer>
      {feedIds &&
        feedIds.map((feedId) => (
          <FeedCommentButton key={feedId} onClick={() => selectFeedId(feedId)}>
            feed:{feedId} 댓글모음
          </FeedCommentButton>
        ))}

      {showCommentInput && (
        <CommentWindowContainer>
          {comments &&
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                item={comment}
                onDelete={onDeleteComment}
              />
            ))}
          <InputWrapper onSubmit={onSubmit}>
            <InputField
              type="text"
              placeholder="댓글달기..."
              name="contentInfo"
              value={comment}
              onChange={onChange}
            />

            {comment && <SubmitButton type="submit">SEND</SubmitButton>}
          </InputWrapper>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </CommentWindowContainer>
      )}
    </FeedContainer>
  );
}
