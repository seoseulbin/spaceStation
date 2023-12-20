import * as S from "./Comments.styles";
import { CommentType } from "./Comments.type";

interface CommentItemProps {
  item: CommentType;
  onDelete: (commentId: string) => void;
}

/*
  코멘트 타입에서 아이템을 가젼와 **댓글을 구성하는 요소**들을 만들어 주는 곳
  onDelete를 item에 넣은 이유
  일단 삭제는 전체 댓글 구현의 요소중 하나이고 comment에서 만들 수도 있었지만 여기에 만드는게 더 가독성도 좋고 재사용성도 있고 유지보수도 더 쉬울것 같았음...
*/
const CommentItem: React.FC<CommentItemProps> = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item._id);
  };

  return (
    <>
      <S.Container>
        <div>comment ID: {item._id}</div>
        <div>user: {item.userId}</div>
        <div>feed ID: {item.feedId}</div>
        <div>comment: {item.content}</div>
        <div>Date: {item.createdAt}</div>

        <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
      </S.Container>
    </>
  );
};

export default CommentItem;
