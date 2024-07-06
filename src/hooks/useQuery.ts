import axios from "axios";
import { useState, useCallback } from "react";
import { Book, SearchResult} from "../types";


const useQuery = () => {
  const [data, setData] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (initialQuery: string, initialLimit: number = 5) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResult>(`https://openlibrary.org/search.json?title=${encodeURIComponent(initialQuery)}&limit=${initialLimit}`);
      
      if (response.data.numFound === 0) {
        setError("Nothing found");
        setData(null);
      } else {
        setData(response.data.docs);
      }
    } catch (error) {
      setData(null);
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, fetchData };
};

export default useQuery;