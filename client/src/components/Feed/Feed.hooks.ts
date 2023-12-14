import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/reactQeury";
import feedAPI from "./Feed.api";
import { useIntersectionObserver } from "../common/hooks/useIntersectionObserver";

export const useFeed = () => {
  const results = useInfiniteQuery({
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
