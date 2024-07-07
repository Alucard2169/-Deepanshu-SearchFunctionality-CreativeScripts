import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types";

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    data: Book[] | null;
    setData: (results: Book[] | null) => void;
    error: string | null;
    setError: (error: string | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    total: number;
    setTotal: (total:number) => void;
    load: boolean;
    setLoad: (load: boolean) => void;

}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState<Book[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [total, setTotal] = useState(0)
    const [load, setLoad] = useState(false)

    

    const value = {
        total,
        setTotal,
        load,
        setLoad,
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
