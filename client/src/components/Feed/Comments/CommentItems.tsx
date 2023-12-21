import * as S from "./Comments.styles";
import { CommentType } from "./Comments.type";
import User from "../../User/User";
import { storage } from "../../../global/storage";

interface CommentItemProps {
  item: CommentType;
  feedUserId: string;
  onDelete: (commentId: string) => void;
}

const localUserData = storage.get("currentUser");
const currentUser = JSON.parse(localUserData as string);

const CommentItem = ({ item, feedUserId, onDelete }: CommentItemProps) => {
  return (
    <>
      <S.Container>
        <S.UserInfo>
          {/* 유저의 프로필과 이름 => useritem 에서 사용 */}
          <User currentUserId={item.userId} />

          {(item.userId === currentUser?.userId ||
            currentUser?.userId === feedUserId) && (
            <S.DeleteButton onClick={() => onDelete(item._id)} />
          )}
        </S.UserInfo>

        <S.Comment>{item.content}</S.Comment>
        <S.CommentDate>{item.createdAt}</S.CommentDate>
      </S.Container>
    </>
  );
};

export default CommentItem;
