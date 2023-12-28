import { useEffect, useState, FormEvent, useRef } from "react";
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
  const [isFlashActive, setFlash] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setComment(e.target.value);

  const currentUser = storage.get("currentUser");

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

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

      //게시후 3초동안 백그라운드
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 3000);
    } catch (err) {
      console.error("게시 오류", err);
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    //엔터만 치면 onsubmit으로
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
    //쉬프트 엔터를 치면 행 변환
    else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      // 새로운 행 추가
      setComment((prevComment) => prevComment + "\n");
    }
  };

  const onDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (err) {
      console.error("댓글 삭제 에러:", err);
    }
  };

  /*
   * 댓글창 뜨면 뒤에 스크롤 금지
   */
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

  /**
   * 댓글치면 댓글창 맨 위로 올라가서 댓글을 보여주는 기능
   */
  const commentWindowRef = useRef<HTMLDivElement>(null);
  //맨 밑으로 내리는
  // useEffect(() => {
  //   commentWindowRef.current?.scrollTo(0, commentWindowRef.current.scrollHeight);
  // }, [comments]);

  //맨 위로 올리는
  useEffect(() => {
    if (commentWindowRef.current) {
      commentWindowRef.current.scrollTop = 0;
    }
  }, [comments]);

  return (
    <S.CommentWindowContainer ref={commentWindowRef}>
      <S.CloseButton onClick={onClickClose}>
        <IoClose />
      </S.CloseButton>

      <S.CommentsCollection>
        {comments &&
          comments
            .map((comment, index) => (
              <CommentItem
                key={comment._id}
                item={comment}
                feedUserId={feedUser}
                onDelete={onDeleteComment}
                flash={index === comments.length - 1 && isFlashActive}
              />
            ))
            .reverse()}
      </S.CommentsCollection>

      <S.CommentHeader>댓글</S.CommentHeader>

      <S.InputWrapper onSubmit={onSubmit}>
        <S.InputField
          placeholder="댓글 달기..."
          value={comment}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {comment && <S.SubmitButton type="submit">전송</S.SubmitButton>}
      </S.InputWrapper>
    </S.CommentWindowContainer>
  );
}
