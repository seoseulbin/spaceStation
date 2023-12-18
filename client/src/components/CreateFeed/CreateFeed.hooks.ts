import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/config/styles/reactQeury";
import feedAPI from "./CreateFeed.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * 샘플 훅
 */
export const useCreateFeed = () => {
  const invalidateSampleQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feed],
    });
  };

  const createFeed = useMutation({
    mutationFn: feedAPI.createFeed,
    onSuccess: invalidateSampleQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { createFeed };
};
