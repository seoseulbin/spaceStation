// TODO: 프로젝트 구조를 보여주기위한 샘플 파일임. 구조 잡히면 지우기.
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/config/styles/reactQeury";
import { SampleType } from "./Sample.type";
import sampleAPI from "./Sample.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * 샘플 훅
 */
export const useSample = () => {
  const { data: samples, ...rest } = useQuery<SampleType[], Error>({
    queryKey: [queryKeys.sample],
    queryFn: sampleAPI.getSamples,
  });

  const invalidateSampleQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.sample],
    });
  };

  const postSample = useMutation({
    mutationFn: sampleAPI.postSample,
    onSuccess: invalidateSampleQuery,
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "unknown error");
    },
  }).mutateAsync;

  return { samples, postSample, ...rest };
};
