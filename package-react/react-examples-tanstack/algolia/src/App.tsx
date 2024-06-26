import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './styles.css'
import Search from './Search'
import ReactQueryRewind from 'react-query-rewind';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>TanStack Query with Algolia</h1>
        <Search />
      </div>
      <ReactQueryRewind />
    </QueryClientProvider>
  )
}
