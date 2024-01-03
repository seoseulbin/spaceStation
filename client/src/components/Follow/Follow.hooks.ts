import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { FollowType } from "./Follow.type";
import followAPI from "./Follow.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const localUserData = localStorage.getItem("currentUser");

/**
 * 팔로우 훅
 */
export const useFollow = (userid: string) => {
  const { data: follows, ...rest } = useSuspenseQuery<
    { follower: FollowType[]; following: FollowType[] },
    Error
  >({
    queryKey: [queryKeys.follow, userid],
    queryFn: () => followAPI.getFollows(userid),
  });

  const myid = localUserData ? JSON.parse(localUserData).userId : 0;
  const checkFollow = follows?.follower.find((obj) =>
    obj.following === myid ? true : false,
  );

  const invalidateFollowQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.follow, userid],
    });
  };

  const deleteFollow = useMutation({
    mutationFn: followAPI.deleteFollow,
    onSuccess: invalidateFollowQuery,
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  const postFollow = useMutation({
    mutationFn: followAPI.postFollow,
    onSuccess: invalidateFollowQuery,
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  return { follows, checkFollow, postFollow, deleteFollow, ...rest };
};
