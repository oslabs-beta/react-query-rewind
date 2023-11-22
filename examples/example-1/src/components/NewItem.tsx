import React from 'react';

const NewItem:React.FC = ({ addNewItem }) => {
  return (
    <div>
      <form
        action="#"
        onSubmit={e => {
          console.log('Submit invoked');
          e.preventDefault();
          addNewItem.mutate(e.target.elements.toDoInput.value);
          e.target.elements.toDoInput.value = ''; // clear input
        }}
      >
        <input type="text" name="toDoInput" placeholder="New Item..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewItem;
