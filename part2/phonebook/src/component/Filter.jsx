const Filter = ({ showFilter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={showFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
