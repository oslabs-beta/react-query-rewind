declare module "*.svelte";

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

declare global {
  interface WindowEventMap {
    UpdateUI: CustomEvent;
    TimeTravel: CustomEvent;
  }
}

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

export type CommentInputsType = { [index: number]: string };
