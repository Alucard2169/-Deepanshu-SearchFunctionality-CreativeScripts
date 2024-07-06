import ResultCards from "./ResultCards"
import down from "/icons/downArrow.svg"
import {QueryResultContainerProps } from "../types";




const QueryResultContainer: React.FC<QueryResultContainerProps> = ({ data, isLoading, error }) => {

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;


    return ( 
        <>
        <div className="w-3/5 flex flex-col gap-4">
        {data.map((book) => (
        <ResultCards book={book} />
      ))}
      </div>
      <button className="text-white flex items-center bg-PRIMARY_BG p-1 rounded-sm">Load More <img src={down} alt="down arrow icon" className="w-5 h-5"/></button>
        </>
     );
}
 
export default QueryResultContainer;