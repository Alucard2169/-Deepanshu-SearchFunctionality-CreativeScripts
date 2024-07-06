import Navbar from "./components/Navbar"
import QueryResultContainer from "./components/QueryResultContainer"
import SearchBar from "./components/SearchBar"


function App() {
 

  return (
    <>
    <header className="sticky top-0 left-0 right-0 z-10">
      <Navbar/>
    </header>
    <main className="flex flex-col items-center gap-20 justify-center pt-6 mb-6">
      <SearchBar/>
      <QueryResultContainer/>
    </main>
    </>
  )
}

export default App




