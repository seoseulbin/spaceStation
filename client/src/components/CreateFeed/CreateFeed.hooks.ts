import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import feedAPI from "./CreateFeed.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/global/constants";
/**
 * 샘플 훅
 */
export const useCreateFeed = () => {
  const navigate = useNavigate();

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
      navigate(PATH.root);
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError ? "정보가 부족합니다." : "unknown error",
      );
    },
  }).mutateAsync;

  return { createFeed };
};
