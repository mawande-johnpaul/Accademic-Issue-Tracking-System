const SearchBar = () => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search issues ..."
                className="search-input"
            />
            <button className="search-button">Search</button>
        </div>
    );
};

export default SearchBar;