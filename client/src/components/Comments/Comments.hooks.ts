import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/config/styles/reactQeury";
import { CommentType } from "./Comments.type";
import commentAPI from "./Comments.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useComment = (feedId: string | null) => {
  const { data: comments, ...rest } = useQuery<CommentType[], Error>({
    queryKey: [queryKeys.comment, feedId],
    queryFn: () => {
      //아이디가 있으면 넘기고
      if (feedId !== null) {
        return commentAPI.getComments(feedId);
      } else {
        //없으면 빈객체 리턴
        return [];
      }
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
    }: {
      content: string;
      userId: string;
      feedId: string;
      createdAt: Date;
    }) => {
      return commentAPI.postComment({ content, userId, feedId });
    },
    onSuccess: () => {
      toast.success("포스트 성공!");
      invalidateCommentQuery();
    },
    onError: (err) => {
      toast.error(err instanceof AxiosError ? err.message : "에러다 에러");
    },
  }).mutateAsync;

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      return commentAPI.deleteComment(commentId);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      invalidateCommentQuery();
    },
    onError: (err) => {
      console.error("Error deleting comment:", err);
      toast.error(err instanceof AxiosError ? err.message : "Unknown error");
    },
  }).mutateAsync;

  return { comments, postComment, deleteComment, ...rest };
};
