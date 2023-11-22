import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Item from './Item';
import NewItem from './NewItem';

// Dummy Data to simulate a database
type todoType = {
  checked: boolean;
  name: string;
  id: string;
};
const TODOS: todoType[] = [
  {
    checked: false,
    name: 'Run',
    id: crypto.randomUUID(),
  },
  {
    checked: false,
    name: 'Code',
    id: crypto.randomUUID(),
  },
];

// simulated network request (fails X% of the time)
const networkRequest = (duration: number) => {
  return new Promise((resolve, reject) => {
    const randomNum = Math.random();
    console.log('Random Number: ', randomNum); // You can see the automatic retries
    if (randomNum < 0.1) {
      setTimeout(reject, duration);
    }
    setTimeout(resolve, duration);
  });
};

// React Component
const ItemContainer:React.FC = () => {
  // get the query client in this context
  const queryClient = useQueryClient();

  // simulating getting initial items from the database
  const itemsQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => networkRequest(1000).then(() => [...TODOS]),
  });

  // Add new item
  const addNewItem = useMutation({
    mutationFn: (itemValue: string) => {
      return networkRequest(1000) // simulating adding data to the db
        .then(() =>
          TODOS.push({
            checked: false,
            name: itemValue,
            id: crypto.randomUUID(),
          })
        );
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });

  // Check or uncheck an item
  const toggleCheck = useMutation({
    mutationFn: (id: string) => {
      return networkRequest(1000).then(() => {
        const index = TODOS.findIndex(obj => obj.id === id);
        TODOS[index].checked = !TODOS[index].checked;
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });

  // Delete an item
  const deleteItem = useMutation({
    mutationFn: (id: string) => {
      return networkRequest(1000).then(() => {
        const index = TODOS.findIndex(obj => obj.id === id);
        TODOS.splice(index, 1);
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });

  if (itemsQuery.isLoading) return <h1>LOADING</h1>;
  if (itemsQuery.isError) return <h3>{`Error: ${itemsQuery.error}`}</h3>;
  return (
    <div>
      <NewItem addNewItem={addNewItem} />
      <ul>
        {itemsQuery.data.map(item => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            checked={item.checked}
            toggleCheck={toggleCheck}
            deleteItem={deleteItem}
          ></Item>
        ))}
      </ul>
    </div>
  );
};

export default ItemContainer;
