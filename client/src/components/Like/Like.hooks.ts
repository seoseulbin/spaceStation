import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { likeAPI } from "./Like.api";
import { storage } from "@/global/storage";

export const useLikes = (feedId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [queryKeys.like, feedId],

    queryFn: async () => {
      const res = await likeAPI.getLikes(feedId);
      const myId = storage.get("currentUser");

      return {
        likes: res,
        isMyLike: res.some((like) => {
          return like.userId === myId;
        }),
      };
    },
  });

  const invalidateSampleQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.like],
    });
  };

  const postLike = useMutation({
    mutationFn: async (feedId: string) => likeAPI.postLikes(feedId),
    onSuccess: invalidateSampleQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  const deleteLike = useMutation({
    mutationFn: async (feedId: string) => likeAPI.deleteLikes(feedId),
    onSuccess: invalidateSampleQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { data, postLike, deleteLike, ...rest };
};
