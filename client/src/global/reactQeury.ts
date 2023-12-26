import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
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
