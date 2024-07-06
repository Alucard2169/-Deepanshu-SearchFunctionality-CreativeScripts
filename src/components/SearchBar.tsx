import React, { useState, useCallback   } from 'react';
import searchLogo from '/icons/searchLogo.svg';
import cross from '/icons/cross.svg';
import DialogueBox from './DialogueBox';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({query,onSearch}) => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);


  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >= 3){
      setIsDialogueOpen(false)
    }
    onSearch(e.target.value);
  }, [onSearch]);


  const handleReset = useCallback(() => {
    onSearch("")
    setIsDialogueOpen(false);
  }, [onSearch]);

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
          onFocus={() => setTimeout(() => setIsDialogueOpen(true), 500)}
          onBlur={() => setTimeout(() => setIsDialogueOpen(false), 200)}
          aria-haspopup="listbox"
          className="outline-none text-sm font-light w-full"
          placeholder='apple, mango....'
        />
        <button
          type='button'
          onClick={handleReset}
          aria-label='clear input'
        >
          <img src={cross} alt="cross icon" className='w-6 h-6'/>
        </button>
      </label>
      {isDialogueOpen && <DialogueBox/>}
    </form>
  );
}

export default SearchBar;