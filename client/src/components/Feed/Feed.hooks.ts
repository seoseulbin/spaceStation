import { useMutation, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./Feed.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";
import { FEED_COLUMN } from "@/global/constants";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useMainFeed = () => {
  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.feed, queryKeys.feedMain],
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
    queryKey: [queryKeys.feed, queryKeys.feedProfile, userId, cursor],
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
    queryKey: [queryKeys.feed, queryKeys.feedCategory, categoryId, cursor],
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
    queryKey: [queryKeys.feed, queryKeys.feedCategory, query, cursor],
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
    queryKey: [queryKeys.feed, queryKeys.feedCategory, hashtag, cursor],
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
    queryKey: [queryKeys.feed, queryKeys.feedBookmark, cursor],
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

export const useDeleteFeed = () => {
  const invalidateFeedQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feed],
    });
  };

  const deleteFeed = useMutation({
    mutationFn: async (_id: string) => {
      return feedAPI.deleteFeed(_id);
    },
    onSuccess: () => {
      toast.success("삭제가 완료되었습니다.");
      invalidateFeedQuery();
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  return { deleteFeed };
};
