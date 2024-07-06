import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types";

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    data: Book[] | null;
    setData: (results: Book[]) => void;
    error: string | null;
    setError: (error: string | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState<Book[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    

    const value = {
        query,
        setQuery,
        data,
        setData,
        error,
        setError,
        isLoading,
        setIsLoading
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};


const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context;
};

export { SearchContextProvider, useSearchContext };
