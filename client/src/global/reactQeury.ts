import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export const queryKeys = {
  category: "CATEGORY",
  follow: "FOLLOW",
  user: "USER",
  findUsers: "FIND_USERS",
  feedMain: "FEED_MAIN",
  feedProfile: "FEED_PROFILE",
  feedCategory: "FEED_CATEGORY",
  feedBookmark: "FEED_BOOKMARK",
  feedSearch: "FEED_SEARCH",
  comment: "COMMENT",
  like: "LIKE",
  bookmark: "BOOKMARK",
};
