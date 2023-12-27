import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { likeAPI } from "./Like.api";
import { LikeType } from "./Like.type";

export const useLikes = (feedId: string) => {
  const { data: likes, ...rest } = useSuspenseQuery<LikeType[]>({
    queryKey: [queryKeys.like, feedId],
    queryFn: () => likeAPI.getLikes(feedId),
  });

  const invalidateQuery = (feedId: string) => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.like, feedId],
    });
  };

  const postLike = useMutation({
    mutationFn: async (feedId: string) => await likeAPI.postLikes(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  const deleteLike = useMutation({
    mutationFn: async (feedId: string) => likeAPI.deleteLikes(feedId),
    onSuccess: (_, feedId) => {
      invalidateQuery(feedId);
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  return { likes, postLike, deleteLike, ...rest };
};
