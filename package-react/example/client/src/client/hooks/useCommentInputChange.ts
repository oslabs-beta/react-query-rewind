import { useState, ChangeEvent } from 'react';

export const useCommentInputChange = () => {
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );

  const commentInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInputs({ ...commentInputs, [index]: event.target.value });
  };

  return { commentInputs, setCommentInputs, commentInputChange };
};
