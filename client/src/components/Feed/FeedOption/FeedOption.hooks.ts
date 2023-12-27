import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./FeedOption.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { PATH } from "@/global/constants";
import { useNavigate } from "react-router-dom";

/**
 * 샘플 훅
 */
export const useDeleteFeed = () => {
  const navigate = useNavigate();

  const invalidateFeedQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.feed],
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
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { deleteFeed };
};
