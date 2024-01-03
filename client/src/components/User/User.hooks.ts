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
import { loadingAtom } from "../common/Loading/EntireLoading";
import { useRecoilState } from "recoil";

export const useUser = (userid: string) => {
  const [isLoading, setisLoading] = useRecoilState(loadingAtom);
  const { data: user, ...rest } = useSuspenseQuery<UserType, Error>({
    queryKey: [queryKeys.user, userid],
    queryFn: () => UserAPI.getUser(userid),
  });

  const invalidateUserQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.user, userid],
    });
  };

  const putUser = useMutation({
    mutationFn: UserAPI.putUser,
    onMutate: () => {
      setisLoading(!isLoading);
    },
    onSuccess: invalidateUserQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
    onSettled: () => {
      setisLoading(!isLoading);
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
