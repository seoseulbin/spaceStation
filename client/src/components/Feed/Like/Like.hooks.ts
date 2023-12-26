import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { likeAPI } from "./Like.api";
import { LikeType } from "./Like.type";
import { PATH } from "@/global/constants";
import { useNavigate } from "react-router-dom";

export const useLikes = (feedId: string) => {
  const navigate = useNavigate();

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
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  const deleteLike = useMutation({
    mutationFn: async (feedId: string) => likeAPI.deleteLikes(feedId),
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

  return { likes, postLike, deleteLike, ...rest };
};
