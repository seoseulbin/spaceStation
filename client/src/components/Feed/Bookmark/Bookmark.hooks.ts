import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { bookmarkAPI } from "./Bookmark.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { BookmarkType } from "./Bookmark.type";

export const useBookmark = (feedId: string) => {
  const { data: bookmarks, ...rest } = useQuery<BookmarkType[]>({
    queryKey: [queryKeys.like, feedId],
    queryFn: () => bookmarkAPI.getBookmarks(),
  });

  const invalidateQuery = (feedId: string) => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.like, feedId],
    });
  };

  const postBookmark = useMutation({
    mutationFn: async (feedId: string) =>
      await bookmarkAPI.postBookmark(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  const deleteBookmark = useMutation({
    mutationFn: async (feedId: string) => bookmarkAPI.deleteBookmark(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { bookmarks, postBookmark, deleteBookmark, ...rest };
};
