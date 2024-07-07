import { lazy, useMemo, useRef, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { Book } from "../types";
import { queryAction } from "../actions/queryAction";
import { debounce } from "lodash";
import CardSkeleton from "./CardSkeleton";

const ResultCards = lazy(() => import('./ResultCards'));

const QueryResultContainer = () => {
  const { query, total, data, error, isLoading, setIsLoading, setTotal, setData, setError } = useSearchContext();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [page, setPage] = useState(1);

  const queryActionDebounce = useMemo(
    () => debounce(async (query: string, page: number) => {
      abortControllerRef.current = new AbortController();
      await queryAction(query, page, setIsLoading, setTotal, setData, setError, abortControllerRef.current.signal);
    }, 300),
    [setIsLoading, setTotal, setData, setError]
  );

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    queryActionDebounce(query, nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    setPage(prevPage)
    queryActionDebounce(query,prevPage)
  }

  return (
    <>
      {error && <p className="bg-PRIMARY_BG p-2 rounded-md text-center text-white">{error}</p>}
      <section className="w-[90%] sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        {data && !isLoading && data.map((item: Book) => (
          <ResultCards book={item} key={item.key} />
        ))}
      </section>
      {isLoading ? <CardSkeleton/> : null}
      {data && total > data.length && (
        <div className="flex items-center gap-4">
        {page > 1 ? <button  className="text-white flex items-center bg-gray-800 p-1 rounded-sm " onClick={handlePrevPage}>Previous Page</button> : null }
        <button className="text-white flex items-center bg-PRIMARY_BG p-1 rounded-sm" onClick={handleLoadMore}>
          Next Page
        </button>
        </div>
      )}
    </>
  );
};

export default QueryResultContainer;
