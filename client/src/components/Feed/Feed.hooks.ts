import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/global/reactQeury";
import feedAPI from "./Feed.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";
import { FEED_COLUMN } from "@/global/constants";

export const useMainFeed = () => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedMain],
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
    queryKey: [queryKeys.feedProfile, userId, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getProfileFeeds({
        userId,
        cursor: pageParam,
        limit: FEED_COLUMN.profile * 4,
      }),
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
      feedAPI.getCategoryFeeds({
        categoryId,
        cursor: pageParam,
        limit: FEED_COLUMN.category * 4,
      }),
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

export const useSearchFeed = (query: string, cursor?: number) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedCategory, query, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getFeedsSearchedByContent({
        query,
        cursor: pageParam,
        limit: FEED_COLUMN.search * 4,
      }),
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

export const useHashtagFeed = (hashtag: string, cursor?: number) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedCategory, hashtag, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getHashtagFeeds({
        hashtag,
        cursor: pageParam,
        limit: FEED_COLUMN.search * 4,
      }),
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

export const useMyBookmardFeed = (cursor?: number) => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feedBookmark, cursor],
    queryFn: ({ pageParam }) =>
      feedAPI.getMyBookmarkFeeds({
        cursor: pageParam,
        limit: FEED_COLUMN.bookmark * 4,
      }),
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
