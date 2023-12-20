import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./UpdateFeed.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { UpdateFeedType } from "./UpdateFeed.type";
/**
 * 샘플 훅
 */
export const useUpdateFeed = (_id: string) => {
  const { data: feed, ...rest } = useQuery<UpdateFeedType, Error>({
    queryKey: [queryKeys.feed, _id],
    queryFn: () => feedAPI.getFeed(_id),
  });

  const invalidateFeedQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feed],
    });
  };

  const updateFeed = useMutation({
    mutationFn: feedAPI.updateFeed,
    onSuccess: () => {
      toast.success("피드가 수정되었습니다.");
      invalidateFeedQuery();
    },
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { updateFeed, feed, ...rest };
};
