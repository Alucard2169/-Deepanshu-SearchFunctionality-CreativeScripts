import axios from 'axios';
import { Book } from '../types';

export const queryAlert = async (
  query: string, 
  limit: number = 5,
  setIsLoading: (isLoading: boolean) => void,
  setTotal: (total: number) => void,
  setData: (data: Book[] | null) => void,
  setError: (error: string | null) => void,
  signal: AbortSignal,
) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=${limit}`,{signal});
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    const { numFound, docs } = response.data;
    if (docs.length === 0) {
      throw new Error("Nothing Found");
    }
    setTotal(numFound);
    setData(docs);
    setError(null);
  } catch (error) {
    setData(null);
    setTotal(0);
    if (axios.isAxiosError(error)) {
      setError(`Network Error: ${error.message}`);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred");
    }
  } finally {
    setIsLoading(false);
  }
};