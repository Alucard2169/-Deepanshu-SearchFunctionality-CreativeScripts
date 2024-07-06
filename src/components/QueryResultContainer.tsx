import { lazy, Suspense } from "react";
import { useSearchContext } from "../context/SearchContext";
import { Book } from "../types";
import CardSkeleton from "./CardSkeleton";
// const ResultCards = lazy(() => import("./ResultCards"));
import down from "/icons/downArrow.svg"
const ResultCards = lazy(() =>  import('./ResultCards'));


const QueryResultContainer = () => {

  const {data,error,isLoading} = useSearchContext()

  if(error) return <div>{error}</div>
  if(isLoading) return <div>{isLoading ? "isLoading" : "nothing"}</div>
    return ( 
        <>
        <section className="w-[90%] sm:w-3/5 flex flex-col gap-4 relative">
        {data && data.map((item : Book) => <Suspense fallback={<CardSkeleton/>} key={item.key}>
          <ResultCards book={item}/>
        </Suspense> )}
        
      </section>
      <button className="text-white flex items-center bg-PRIMARY_BG p-1 rounded-sm">Load More <img src={down} alt="down arrow icon" className="w-5 h-5"/></button>
        </>
     );
}
 
export default QueryResultContainer;