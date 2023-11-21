import React from 'react';

const Item = ({ id, name, checked, toggleCheck, deleteItem }) => {
  const liStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    listStyleType: 'none',
    width: '15%',
    paddingTop: '2px',
  };

  const checkBoxClick = e => {
    console.log('Toggled');
    toggleCheck.mutate(e.target.id);
  };

  const deleteItemFunc = e => {
    deleteItem.mutate(e.target.id);
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
