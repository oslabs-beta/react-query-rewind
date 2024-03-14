export type Reply = {
  text: string;
  timestamp: string;
  username: string;
  picture: string;
};

export type Comment = {
  text: string;
  liked: boolean;
  replies: Reply[];
  createComment: boolean;
  timestamp: string;
  username: string;
  picture: string;
};

export type CreateCommentParams = {
  commentIndex: number;
  reply: Reply;
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
