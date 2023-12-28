import * as S from "./Comments.styles";
import { IoClose } from "react-icons/io5";
import Comment from "./Comments";

interface CommentContainerProps {
  feedId: string;
  feedUser: string;
  onClickClose: () => void;
}

export default function CommentContainer({
  feedId,
  feedUser,
  onClickClose,
}: CommentContainerProps) {
  return (
    <>
      <S.CommentWindowContainer>
        <S.CloseButton onClick={onClickClose}>
          <IoClose />
        </S.CloseButton>

        <Comment feedId={feedId} feedUser={feedUser} />
      </S.CommentWindowContainer>
    </>
  );
}
