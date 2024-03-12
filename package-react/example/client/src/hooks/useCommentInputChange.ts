import { useState, ChangeEvent } from 'react';

export const useCommentInputChange = () => {
  const [commentInput, setCommentInput] = useState('');

  const commentInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentInput(event.target.value);
  };

  return { commentInput, setCommentInput, commentInputChange };
};
