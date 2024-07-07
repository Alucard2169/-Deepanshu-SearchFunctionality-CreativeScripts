import axios from 'axios';
import { Book } from '../types';

interface CacheEntry {
  query: string;
  page: number;
  data: Book[];
  numFound: number;
}

// Simple cache object
const cache: { [key: string]: CacheEntry } = {};

export const queryAction = async (
  query: string,
  page: number = 1,
  setIsLoading: (isLoading: boolean) => void,
  setTotal: (total: number) => void,
  setData: React.Dispatch<React.SetStateAction<Book[] | null>>,
  setError: (error: string | null) => void,
  signal: AbortSignal,
) => {
  const cacheKey = `${query}_${page}`;

  try {
    setIsLoading(true);

    if (cache[cacheKey]) {
  
      const { data: cachedData, numFound } = cache[cacheKey];
      setTotal(numFound); 
      setData(cachedData);
      setError(null);
    } else {
   
      const cancelToken = axios.CancelToken.source();
      const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&page=${page}&limit=4`, {
        cancelToken: cancelToken.token,
        signal,
      });

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
      }

      const { numFound, docs } = response.data;
      if (docs.length === 0) {
        throw new Error("Nothing Found");
      }

 
      cache[cacheKey] = { query, page, data: docs , numFound};

      setTotal(numFound);
      setData(docs);
      setError(null);
    }

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        setError(`Error: ${error.response.status}`);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } else {
      setError("An unexpected error occurred");
    }

    setData(null);
    setTotal(0);

  } finally {
    setIsLoading(false);
  }
};
