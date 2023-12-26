import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { bookmarkAPI } from "./Bookmark.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { BookmarkType } from "./Bookmark.type";
import { PATH } from "@/global/constants";
import { useNavigate } from "react-router-dom";

export const useBookmark = (feedId: string) => {
  const navigate = useNavigate();

  const { data: bookmarks, ...rest } = useSuspenseQuery<BookmarkType[]>({
    queryKey: [queryKeys.bookmark, feedId],
    queryFn: () => bookmarkAPI.getBookmarkByFeedId(feedId),
  });

  const invalidateQuery = (feedId: string) => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.bookmark, feedId],
    });
  };

  const postBookmark = useMutation({
    mutationFn: async (feedId: string) =>
      await bookmarkAPI.postBookmark(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }

      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  const deleteBookmark = useMutation({
    mutationFn: async (feedId: string) => bookmarkAPI.deleteBookmark(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }

      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { bookmarks, postBookmark, deleteBookmark, ...rest };
};
