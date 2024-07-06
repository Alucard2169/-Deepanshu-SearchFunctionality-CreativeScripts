export interface Book {
    key: string,
    title: string;
    author_name: string[];
    first_publish_year: number;
    want_to_read_count: number;
    currently_reading_count: number;
    already_read_count: number;
  }
  

export interface QueryResultContainerProps {
    data: Book[] | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface SearchResult {
    numFound: number;
    start: 0;
    numFoundExact: boolean;
    docs: Book[];
    num_found: number;
    q: string,
    offset: number | null
  }