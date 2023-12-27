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
  feed: "FEED",
  category: "CATEGORY",
  follow: "FOLLOW",
  user: "USER",
  feedUser: "FEED_USER",
  feedCategory: "FEED_CATEGORY",
  feedBookmark: "FEED_BOOKMARK",
  comment: "FEED_COMMENT",
  like: "LIKE",
  bookmark: "BOOKMARK",
};
