import React, {  useState   } from 'react';
import searchLogo from '/icons/searchLogo.svg';
import cross from '/icons/cross.svg';
import DialogueBox from './DialogueBox';
import { useSearchContext } from '../context/SearchContext';
import axios from 'axios';
import { HashLoader, MoonLoader } from 'react-spinners';



const SearchBar = () => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const {query,setQuery,isLoading,setData,setError,setIsLoading} = useSearchContext()


  const queryAction = async (query: string, limit: number = 5) => {
    try {
        setIsLoading(true);
        const response = await axios.get(`https://openlibrary.org/search.json?title=${query}&limit=${limit}`);
        
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = response.data; 
        if(data.docs === 0){
            throw new Error("Nothing Found")
        }
        setData(data.docs);
        setError(null);
    } catch (error: any) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
};




  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >= 3){
      setIsDialogueOpen(false)
      queryAction(e.target.value)
    }
    else{
      setIsDialogueOpen(true)
    }
    setQuery(e.target.value)
  }

  const handleReset =  () => {
    setQuery('')
    setIsDialogueOpen(false);
  }



  return (
    <form className='relative w-[90%] sm:w-1/4' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="query" className='flex gap-2 items-center border-b border-black pb-3 w-full'>
        <img src={searchLogo} alt="search icon" className='w-5 h-5'/>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleInput}
          onFocus={() => setTimeout(() => setIsDialogueOpen(true), 200)}
          onBlur={() => setIsDialogueOpen(false)}
          aria-haspopup="listbox"
          className="outline-none text-sm font-light w-full"
          placeholder='Lord of the Rings...'
        />
        {isLoading ?<HashLoader 
        size="16"
  color="#1f7ae0"
/> : <button
          type='button'
          onClick={handleReset}
          aria-label='clear input'
        >
          <img src={cross} alt="cross icon" className='w-6 h-6'/>
        </button>}
      </label>
      {isDialogueOpen && <DialogueBox/>}
    </form>
  );
}

export default SearchBar;