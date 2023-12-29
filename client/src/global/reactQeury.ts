import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      throwOnError: (err) =>
        err instanceof AxiosError && err.response?.status == 401,
    },
  },
});

export const queryKeys = {
  category: "CATEGORY",
  follow: "FOLLOW",
  user: "USER",
  findUsers: "FIND_USERS",
  feed: "FEED",
  feedMain: "FEED_MAIN",
  feedProfile: "FEED_PROFILE",
  feedCategory: "FEED_CATEGORY",
  feedBookmark: "FEED_BOOKMARK",
  feedGeoLocation: "FEED_GEO_LOCATION",
  feedSearch: "FEED_SEARCH",
  comment: "COMMENT",
  like: "LIKE",
  bookmark: "BOOKMARK",
};
