import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { CommentType } from "./Comments.type";
import commentAPI from "./Comments.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useComment = (feedId: string) => {
  const { data: comments, ...rest } = useSuspenseQuery<CommentType[], Error>({
    queryKey: [queryKeys.comment, feedId],
    queryFn: () => {
      return commentAPI.getComments(feedId);
    },
  });

  const invalidateCommentQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.comment],
    });
  };

  const postComment = useMutation({
    mutationFn: async ({
      content,
      userId,
      feedId,
      parentCommentId,
    }: {
      content: string;
      userId: string;
      feedId: string;
      parentCommentId?: string;
    }) => {
      return commentAPI.postComment({
        content,
        userId,
        feedId,
        parentCommentId,
      });
    },
    onSuccess: () => {
      toast.success("댓글을 달았습니다.");
      invalidateCommentQuery();
    },
    onError: (err) => {
      //AxiosError면 에러메세지, 일반 에러면 "댓글 포스트 실패" 전송
      toast.error(err instanceof AxiosError ? err.message : "댓글 포스트 실패");
    },
  }).mutateAsync;

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      return commentAPI.deleteComment(commentId);
    },
    onSuccess: () => {
      toast.success("댓글을 삭제하였습니다.");
      invalidateCommentQuery();
    },
    onError: (err) => {
      console.error("댓글 삭제 에러", err);
      toast.error(err instanceof AxiosError ? err.message : "알 수 없는 에러");
    },
  }).mutateAsync;

  return { comments, postComment, deleteComment, ...rest };
};
