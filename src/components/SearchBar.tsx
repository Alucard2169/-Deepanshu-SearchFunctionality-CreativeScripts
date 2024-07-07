import React, {  useCallback, useMemo, useRef,useState   } from 'react';
import searchLogo from '/icons/searchLogo.svg';
import cross from '/icons/cross.svg';
import DialogueBox from './DialogueBox';
import { useSearchContext } from '../context/SearchContext';
import { HashLoader } from 'react-spinners';
import { queryAlert } from '../actions/queryAction';
import { debounce } from 'lodash';



const SearchBar = () => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const {query,setQuery,setTotal,isLoading,setData,setError,setIsLoading} = useSearchContext()
  const abortControllerRef = useRef<AbortController | null>(null);

  const queryAction = useMemo(
    () => debounce(async (query: string, limit: number = 5) => {
      abortControllerRef.current = new AbortController();
      await queryAlert(query, limit, setIsLoading, setTotal, setData, setError,abortControllerRef.current.signal);
    }, 300),
    [setIsLoading, setTotal, setData, setError]
  );



  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsDialogueOpen(value.length < 3);  

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }


    if (value.length < 3) {
      setData(null);
      setTotal(0);
      setError(null);
      queryAction.cancel();
    } else {
      queryAction(value);
    }
    
  }, [queryAction, setQuery, setData, setTotal, setError, setIsDialogueOpen]);
  
  const handleReset = () => {
    setQuery('');
    setData(null);
    setError(null);
    setTotal(0);
    setIsDialogueOpen(false);
    queryAction.cancel(); 
  };


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