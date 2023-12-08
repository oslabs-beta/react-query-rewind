import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryDisplay } from './types';

const TimeTravel = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const listener = (event: CustomEvent) => {
      const currentQuery: QueryDisplay[] = event.detail.currentQuery;
      currentQuery.forEach((queryState) => {
        if (queryState.queryData !== 'N/A') {
          queryClient.setQueryData(
            [queryState.queryKey.slice(2, -2)],
            queryState.queryData
          );
        }
      });
    };
    window.addEventListener('UpdateUI', listener);
    return () => window.removeEventListener('UpdateUI', listener);
  }, []);

  return <></>;
};

export default TimeTravel;
