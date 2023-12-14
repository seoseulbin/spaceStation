import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/reactQeury";
import feedAPI from "./Feed.api";

export const useFeed = () => {
  const results = useInfiniteQuery({
    queryKey: [queryKeys.feed],
    queryFn: ({ pageParam }) =>
      feedAPI.getFeeds({ cursor: pageParam, limit: 3 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return results;
};
