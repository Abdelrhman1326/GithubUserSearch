import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("searchValue"));
        if (saved) setSearch(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("searchValue", JSON.stringify(search));
    }, [search]);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);