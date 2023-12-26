import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/global/reactQeury";
import { CommentType } from "./Comments.type";
import commentAPI from "./Comments.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { PATH } from "@/global/constants";
import { useNavigate } from "react-router-dom";

export const useComment = (feedId: string) => {
  const navigate = useNavigate();

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
    }: {
      content: string;
      userId: string;
      feedId: string;
    }) => {
      return commentAPI.postComment({ content, userId, feedId });
    },
    onSuccess: () => {
      toast.success("댓글 달기 성공!");
      invalidateCommentQuery();
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }

      toast.error(
        err instanceof AxiosError ? err.message : "댓글 못 달았어 에러다 에러",
      );
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
      if (err instanceof AxiosError && err.response?.status == 401) {
        toast.error(err.response?.data.error);
        navigate(PATH.login);
        return;
      }

      console.error("Error deleting comment:", err);
      toast.error(err instanceof AxiosError ? err.message : "Unknown error");
    },
  }).mutateAsync;

  return { comments, postComment, deleteComment, ...rest };
};
