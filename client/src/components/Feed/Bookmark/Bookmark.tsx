import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FeedType } from "../Feed.type";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import * as S from "./Bookmark.styles";
import { useBookmark } from "./Bookmark.hooks";
import { PATH } from "@/global/constants";
import { storage } from "@/global/storage";
import ApiBoundary from "@/components/common/ApiBoundary";
import { theme } from "@/global/styles/theme";

type Props = { feedId: FeedType["_id"] };

export default function Bookmark(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ feedId }: { feedId: FeedType["_id"] }) {
  const navigate = useNavigate();
  const { bookmarks, postBookmark, deleteBookmark } = useBookmark(feedId);
  const currentUser = storage.get("currentUser");

  const isMyBookmark = bookmarks.some(
    (bookmark) => bookmark.userId === currentUser?.userId,
  );

  let isFetching = false;
  const handleBookmarkButton = async () => {
    if (isFetching) return;

    isFetching = true;

    if (!currentUser) {
      toast.error("로그인이 필요합니다.");
      isFetching = false;
      navigate(PATH.login);
      return;
    }

    isMyBookmark ? await deleteBookmark(feedId) : await postBookmark(feedId);
    isFetching = false;
  };

  return (
    <S.bookmarkButtonDiv id={feedId} onClick={handleBookmarkButton}>
      {isMyBookmark && <FaBookmark color={theme.colors.main} size="25" />}
      {!isMyBookmark && <FaRegBookmark color={theme.colors.main} size="25" />}
    </S.bookmarkButtonDiv>
  );
}
