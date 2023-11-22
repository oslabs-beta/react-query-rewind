import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';

type newItemProps = {
  addNewItem: UseMutationResult<number, Error, string, unknown>
}

const NewItem:React.FC<newItemProps> = ({ addNewItem }) => {
  return (
    <div>
      <form
        action="#"
        onSubmit={ (e: React.FormEvent<HTMLFormElement>) => {
          console.log('Submit invoked');
          e.preventDefault();

          const form = e.currentTarget as HTMLFormElement;
          const inputElem = form.elements.namedItem('toDoInput') as HTMLInputElement;
          if (inputElem) {
            addNewItem.mutate(inputElem.value);
            inputElem.value = ''; // clear input
          }
        }}
      >
        <input type="text" name="toDoInput" placeholder="New Item..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewItem;
