import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./FeedOption.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * 샘플 훅
 */
export const useDeleteFeed = () => {
  const invalidateFeedQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feedMain],
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
