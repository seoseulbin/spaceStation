export type CommentType = {
  _id: string;
  feedId: string;
  content: string;
  userId: string;
  createdAt: string;
  parentCommentId: string | null;
};
