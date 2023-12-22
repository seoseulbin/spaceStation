import { FeedType } from "../Feed.type";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import * as S from "./Bookmark.styles";
import { useBookmark } from "./Bookmark.hooks";
import React, { useEffect, useState } from "react";
import { storage } from "@/global/storage";
import toast from "react-hot-toast";

export default function Bookmark({ feedId }: { feedId: FeedType["_id"] }) {
  const userInfo = storage.get("currentUser");
  const { bookmarks, postBookmark, deleteBookmark, isSuccess, isFetching } =
    useBookmark(feedId);
  const [bookmark, setBookmark] = useState<boolean | undefined>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const handleBookmarkButton = async (e: React.MouseEvent<HTMLDivElement>) => {
    const targetFeedId = e.currentTarget.id;

    if (!userInfo) {
      toast.error("로그인이 필요합니다.");
    }

    if (!bookmark) {
      await postBookmark(targetFeedId);
      setBookmark(!bookmark);
    }
    if (bookmark) {
      await deleteBookmark(targetFeedId);
      setBookmark(!bookmark);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setCurrentUserId(JSON.parse(userInfo).userId);
    }

    if (isSuccess || isFetching) {
      const isMyBookmark = bookmarks?.some(
        (bookmark) => bookmark.userId === currentUserId,
      );
      alert(isMyBookmark);
      setBookmark(isMyBookmark);
    }
  }, [isSuccess, isFetching, userInfo, currentUserId, bookmarks]);

  return (
    <S.bookmarkButtonDiv id={feedId} onClick={handleBookmarkButton}>
      {bookmark && <FaBookmark size="20" />}
      {!bookmark && <FaRegBookmark size="20" />}
    </S.bookmarkButtonDiv>
  );
}
