import { useState, ChangeEvent, FormEvent } from "react";
import { useComment } from "./Comments.hooks";
import CommentItem from "./CommentItems";
import * as S from "./Comments.styles";

interface CommentProps {
  feedId: string;
  onClickClose: () => void;
}

export default function Comment({ feedId, onClickClose }: CommentProps) {
  const { comments, postComment, deleteComment, isLoading, isError, error } =
    useComment(feedId);
  const [comment, setComment] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!feedId) {
        console.error("해당된 피드가 없습니다.");
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
        feedId: feedId,
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

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
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
      <S.CancelButton onClick={onClickClose}>취소</S.CancelButton>
    </S.CommentWindowContainer>
  );
}
