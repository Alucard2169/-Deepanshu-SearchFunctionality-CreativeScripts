import { useCallback, useState } from "react"
import Navbar from "./components/Navbar"
import QueryResultContainer from "./components/QueryResultContainer"
import SearchBar from "./components/SearchBar"
import useQuery from "./hooks/useQuery";

function App() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error, fetchData } = useQuery();

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length >= 3) {
      fetchData(searchQuery);
    }
  }, [fetchData]);



  return (
    <>
    <header className="sticky top-0 left-0 right-0 z-10">
      <Navbar/>
    </header>
    <main className="flex flex-col items-center gap-20 justify-center pt-6 mb-6">
      <SearchBar query={query} onSearch={handleSearch}/>
      <QueryResultContainer data={data} isLoading={isLoading} error={error}/>
    </main>
    </>
  )
}

export default App




