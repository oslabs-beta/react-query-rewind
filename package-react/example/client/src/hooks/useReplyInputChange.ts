import { useState, ChangeEvent } from 'react';

export const useReplyInputChange = () => {
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});

  const replyInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReplyInputs({ ...replyInputs, [index]: event.target.value });
  };

  return { replyInputs, setReplyInputs, replyInputChange };
};
