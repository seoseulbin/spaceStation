import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/config/styles/reactQeury";
import { UserType } from "./User.type";
import UserAPI from "./User.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
/**
 * 유저 훅
 */
export const useUser = (userid: string) => {
  const { data: user, ...rest } = useQuery<UserType, Error>({
    queryKey: [queryKeys.user, userid],
    queryFn: () => UserAPI.getUser(userid),
  });

  const invalidateUserQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.user],
    });
  };

  const putUser = useMutation({
    mutationFn: UserAPI.putUser,
    onSuccess: invalidateUserQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { user, putUser, ...rest };
};
