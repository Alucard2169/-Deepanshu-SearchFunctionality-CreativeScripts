import { lazy } from "react";
import { useSearchContext } from "../context/SearchContext";
import { Book } from "../types";
import down from "/icons/downArrow.svg"
import CardSkeleton from "./CardSkeleton";
const ResultCards = lazy(() =>  import('./ResultCards'));


const QueryResultContainer = () => {
  

  const {total,data, error, isLoading} = useSearchContext()

    return ( 
        <>
        <section className="w-[90%] sm:w-3/5 flex flex-col gap-4 relative">
        {error && <p className="bg-PRIMARY_BG p-2 rounded-md text-center text-white">{error}</p> }
        {isLoading ? <CardSkeleton/> : null}
          {data && !isLoading && data.map((item : Book) =>
          <ResultCards book={item} key={item.key}/>
        )}
        
        
      </section>
      {total > 5 ? <button className="text-white flex items-center bg-PRIMARY_BG p-1 rounded-sm">Load More <img src={down} alt="down arrow icon" className="w-5 h-5"/></button> : null}
        </>
     );
}
 
export default QueryResultContainer;