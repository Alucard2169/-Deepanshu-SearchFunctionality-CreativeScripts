import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main className="flex justify-center py-6">
      <SearchBar/>
    </main>
    </>
  )
}

export default App
