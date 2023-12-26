import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/global/reactQeury";
import feedAPI from "./Feed.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";

export const useMainFeed = () => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feed],
    queryFn: ({ pageParam }) =>
      feedAPI.getMainFeeds({ cursor: pageParam, limit: 4 }),
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

export const useProfileFeed = (userId: string, cursor?: number) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedUser, userId, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getProfileFeeds({ userId, cursor: pageParam, limit: 12 }),
    initialPageParam: cursor ?? 0,
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

export const useCategoryFeed = (categoryId: string, cursor?: number) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedCategory, categoryId, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getCategoryFeeds({ categoryId, cursor: pageParam, limit: 8 }),
    initialPageParam: cursor ?? 0,
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
