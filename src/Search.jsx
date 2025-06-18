import { FiSearch } from 'react-icons/fi';
import { useSearch } from "./Context/SearchContext";
import './App.css';

const Search = () => {
    const { search, setSearch } = useSearch();

    return (
        <div className="search-container">
            <div className="all-title">
                <h1 className="main-title">Discover Amazing Developers</h1>
                <h3>Search for GitHub users and explore their profiles</h3>
            </div>

            <div className="input-wrapper">
                <FiSearch className="search-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;
