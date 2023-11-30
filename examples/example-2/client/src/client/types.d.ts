export type Post = {
  text: string;
  liked: boolean;
  comments: string[];
  createComment: boolean;
  timestamp: string;
};

export type CreateCommentParams = {
  index: number;
  comment: string;
};
