import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.status == 401) {
          throw err;
        }
        toast.error(
          err instanceof AxiosError
            ? err.response?.data.error
            : "unknown error",
        );
      },
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
