import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { CommentLikeType } from "./CommentLike.type";
import { commentLikeAPI } from "./CommentLike.api";

export const useCommentLikes = (commentId: string) => {
  const { data: commentLikes, ...rest } = useSuspenseQuery<CommentLikeType[]>({
    queryKey: [queryKeys.like, commentId],
    queryFn: () => commentLikeAPI.getLikes(commentId),
  });

  const invalidateQuery = (commentId: string) => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.like, commentId],
    });
  };

  const postLike = useMutation({
    mutationFn: async (commentId: string) =>
      await commentLikeAPI.postLikes(commentId),
    onSuccess: (_, commentId) => {
      invalidateQuery(commentId);
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  const deleteLike = useMutation({
    mutationFn: async (commentId: string) =>
      commentLikeAPI.deleteLikes(commentId),
    onSuccess: (_, commentId) => {
      invalidateQuery(commentId);
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  return { commentLikes, postLike, deleteLike, ...rest };
};
