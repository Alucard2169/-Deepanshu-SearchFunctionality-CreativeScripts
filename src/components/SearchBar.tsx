import { useState, useCallback } from 'react';
import searchLogo from '/icons/searchLogo.svg';
import cross from '/icons/cross.svg';
import DialogueBox from './DialogueBox';

const SearchBar = () => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);

    // hides dialogue box if input length exceeds 3
    setIsDialogueOpen(newValue.length < 3);
  }, []);

  const handleReset = useCallback(() => {
    setQuery('');
    setIsDialogueOpen(false);
  }, []);

  return (
    <form className='w-1/4'>
      <label htmlFor="query" className='flex gap-2 items-center border-b border-black pb-3 w-full'>
        <img src={searchLogo} alt="search icon" className='w-5 h-5'/>
        <input 
          type="text" 
          id="query" 
          name="query" 
          value={query} 
          minLength={3} 
          onChange={handleInput}
          onFocus={() => setTimeout(()=>setIsDialogueOpen(true),500)}
          onBlur={() => setIsDialogueOpen(false)}
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
      {isDialogueOpen && <DialogueBox />}
    </form>
  );
}

export default SearchBar;