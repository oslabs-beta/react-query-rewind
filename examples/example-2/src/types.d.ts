export type Post = {
  text: string;
  liked: boolean;
  comments: string[];
  createComment: boolean;
};

export type CreateCommentParams = {
  index: number;
  comment: string;
};
