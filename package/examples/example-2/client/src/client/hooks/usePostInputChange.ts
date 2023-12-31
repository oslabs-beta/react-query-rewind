import { useState, ChangeEvent } from 'react';

export const usePostInputChange = () => {
  const [postInput, setPostInput] = useState('');

  const postInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostInput(event.target.value);
  };

  return { postInput, setPostInput, postInputChange };
};
