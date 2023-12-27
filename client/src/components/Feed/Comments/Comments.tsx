import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useComment } from "./Comments.hooks";
import CommentItem from "./CommentItems";
import * as S from "./Comments.styles";
import { storage } from "../../../global/storage";
import ApiBoundary from "../../common/ApiBoundary";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

interface CommentProps {
  feedId: string;
  feedUser: string;
  onClickClose: () => void;
}

export default function Comment(props: CommentProps) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ feedId, feedUser, onClickClose }: CommentProps) {
  const { comments, postComment, deleteComment } = useComment(feedId);
  const [comment, setComment] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const currentUser = storage.get("currentUser");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //로그인을 안 했을 때의 오류 문자
      if (!currentUser) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      //삭제된 게시물에 댓글을 달 때의 오류문자
      if (!feedId) {
        toast.error("해당된 피드가 없습니다.");
        return;
      }

      //비어있으면 전송 X
      if (comment.trim() === "") {
        return;
      }

      //댓글 내용 불러오기
      await postComment({
        content: comment,
        userId: currentUser.userId,
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

  //댓글창 뜨면 뒤에 스크롤 금지
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <S.CommentWindowContainer>
      <S.CloseButton onClick={onClickClose}>
        <IoClose />
      </S.CloseButton>

      <S.CommentsCollection>
        {comments &&
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              item={comment}
              feedUserId={feedUser}
              onDelete={onDeleteComment}
            />
          ))}
      </S.CommentsCollection>

      <S.CommentHeader>댓글</S.CommentHeader>

      <S.InputWrapper onSubmit={onSubmit}>
        <S.InputField
          type="text"
          placeholder="댓글달기..."
          name="contentInfo"
          value={comment}
          onChange={onChange}
        />

        {comment && <S.SubmitButton type="submit">전송</S.SubmitButton>}
      </S.InputWrapper>
    </S.CommentWindowContainer>
  );
}
