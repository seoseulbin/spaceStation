import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/config/styles/reactQeury";
import { FollowType } from "./Follow.type";
import followAPI from "./Follow.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * 팔로우 훅
 */
export const useFollow = (userid: string) => {
  const { data: follows, ...rest } = useQuery<
    { follower: FollowType[]; following: FollowType[] },
    Error
  >({
    queryKey: [queryKeys.follow, userid],
    queryFn: () => followAPI.getFollows(userid),
  });

  const invalidateFollowQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.follow],
    });
  };

  const deleteFollow = useMutation({
    mutationFn: followAPI.deleteFollow,
    onSuccess: invalidateFollowQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  const postFollow = useMutation({
    mutationFn: followAPI.postFollow,
    onSuccess: invalidateFollowQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { follows, postFollow, deleteFollow, ...rest };
};
