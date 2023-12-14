import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/reactQeury";
import { FeedType } from "./Feed.type";
import feedAPI from "./Feed.api";

export const useFeed = () => {
  const { data: feeds, ...rest } = useQuery<FeedType[], Error>({
    queryKey: [queryKeys.feed],
    queryFn: feedAPI.getFeeds,
  });

  return { feeds, ...rest };
};
