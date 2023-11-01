const SearchBar = ({ onFilterCountryTextChange, filterCountryText }) => {
  return (
    <form>
      find countries
      <input
        type="text"
        value={filterCountryText}
        placeholder="search..."
        onChange={(e) => onFilterCountryTextChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
