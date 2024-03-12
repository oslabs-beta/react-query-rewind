export type Reply = {
  text: string;
  timestamp: string;
  username: string;
  picture: string;
};

export type Post = {
  text: string;
  liked: boolean;
  comments: Reply[];
  createComment: boolean;
  timestamp: string;
  username: string;
  picture: string;
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
