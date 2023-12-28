import {
  useMutation,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { UserType } from "./User.type";
import UserAPI from "./User.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import userAPI from "./User.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";

export const useUser = (userid: string) => {
  const { data: user, ...rest } = useSuspenseQuery<UserType, Error>({
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

export const useSearchUsers = (query: string) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.findUsers, query],
    queryFn: ({ pageParam }) =>
      userAPI.getSearchUsers({
        query,
        cursor: pageParam,
        limit: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: ({ data, nextCursor }) => {
      if (data.length === 0) return null;
      return nextCursor;
    },
  });

  const { setTarget } = useIntersectionObserver({
    onIntersect: results.fetchNextPage,
    shouldBeBlocked: !results.hasNextPage || results.isError,
  });

  return { ...results, setTarget };
};
