import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/global/reactQeury";
import feedAPI from "./Feed.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";

export const useFeed = () => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feed],
    queryFn: ({ pageParam }) =>
      feedAPI.getFeeds({ cursor: pageParam, limit: 3 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { setTarget } = useIntersectionObserver({
    onIntersect: results.fetchNextPage,
    shouldBeBlocked: !results.hasNextPage || results.isError,
  });

  return { ...results, setTarget };
};

export const useUserFeed = ({ userId }: { userId: string }) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedUser, userId],
    queryFn: ({ pageParam }) =>
      feedAPI.getUserFeeds({ userId, cursor: pageParam, limit: 12 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { setTarget } = useIntersectionObserver({
    onIntersect: results.fetchNextPage,
    shouldBeBlocked: !results.hasNextPage || results.isError,
  });

  return { ...results, setTarget };
};

export const useCategoryFeed = ({ category }: { category: string }) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedCategory, category],
    queryFn: ({ pageParam }) =>
      feedAPI.getCategoryFeeds({ category, cursor: pageParam, limit: 8 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { setTarget } = useIntersectionObserver({
    onIntersect: results.fetchNextPage,
    shouldBeBlocked: !results.hasNextPage || results.isError,
  });

  return { ...results, setTarget };
};
