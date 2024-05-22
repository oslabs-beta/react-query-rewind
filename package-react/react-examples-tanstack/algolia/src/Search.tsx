import * as React from 'react'
import { useQueryClient } from '@tanstack/react-query';
import SearchResults from './SearchResults'

export default function Search() {
  const [query, setQuery] = React.useState('')

  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  React.useEffect(() => {
    const unsubscribe = queryCache.subscribe((event: any) => {  
      if (event.type === 'added') console.log('event', event)
      
  });
    return () => unsubscribe();
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    // It is recommended to debounce this event in prod
    setQuery(event.target.value)
  }

  return (
    <div>
      <input
        onChange={handleOnChange}
        value={query}
        placeholder="Search products"
      />
      <SearchResults query={query} />
    </div>
  )
}
