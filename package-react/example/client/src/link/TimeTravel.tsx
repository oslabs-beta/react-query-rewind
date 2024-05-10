import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

function TimeTravel() {
  const queryClient = useQueryClient();

  const handleUpdateUi = (message: MessageEvent) => {
    if (message.data?.type === 'update-ui') {
      const currentQuery: QueryDisplay[] = message.data.payload;
      currentQuery.forEach(queryState => {
        if (queryState.queryData !== '') {
          queryClient.setQueryData(
            [queryState.queryKey.slice(2, -2)],
            queryState.queryData
          );
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleUpdateUi);

    return () => {
      window.removeEventListener('message', handleUpdateUi);
    };
  }, []);

  return <></>;
}

export default TimeTravel;
