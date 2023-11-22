import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';

type itemTypes = {
  id: string,
  name: string,
  checked: boolean,
  toggleCheck: UseMutationResult<void, unknown, string, unknown>,
  deleteItem: UseMutationResult<void, unknown, string, unknown>,
}

const Item:React.FC<itemTypes> = ({ id, name, checked, toggleCheck, deleteItem }) => {
  const liStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    listStyleType: 'none',
    width: '15%',
    paddingTop: '2px',
  };

  const checkBoxClick = (e: React.ChangeEvent<HTMLInputElement>)  => {
    console.log('Toggled');
    toggleCheck.mutate(e.currentTarget.id);
  };

  const deleteItemFunc = (e: React.MouseEvent<HTMLButtonElement>)  => {
    deleteItem.mutate(e.currentTarget.id);
  };

  return (
    <li style={liStyle}>
      <input
        type="checkbox"
        defaultChecked={checked}
        id={id}
        onChange={checkBoxClick}
      />
      <label htmlFor={id}>{name}</label>
      <button onClick={deleteItemFunc}>&#x2716;</button>
    </li>
  );
};

export default Item;
