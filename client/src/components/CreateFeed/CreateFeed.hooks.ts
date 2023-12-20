import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./CreateFeed.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * 샘플 훅
 */
export const useCreateFeed = () => {
  const invalidateFeedQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feed],
    });
  };

  const createFeed = useMutation({
    mutationFn: feedAPI.createFeed,
    onSuccess: () => {
      toast.success("피드가 추가되었습니다.");
      invalidateFeedQuery();
    },
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { createFeed };
};
