import React from "react";

// Platform IDs di RAWG API: PC (4), PlayStation (18), Xbox (1)
const PLATFORMS = [
  { id: 4, name: "PC" },
  { id: 18, name: "PlayStation" },
  { id: 1, name: "Xbox" },
];

const SORT_OPTIONS = [
  { value: "-rating", name: "Rating Tertinggi" },
  { value: "-released", name: "Rilis Terbaru" },
  { value: "name", name: "Nama (A-Z)" },
];

function SearchForm({
  searchTerm,
  onSearchChange,
  selectedPlatforms,
  onPlatformToggle,
  sortOption,
  onSortChange,
  onSubmitSearch,
}) {
  // CPMK0501: Form Implementation (minimal 5 input berbeda)
  // Input 1: Text Search
  // Input 2, 3, 4: Checkbox Platform
  // Input 5: Select/Dropdown Sort

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(); // Panggil fungsi fetch data di App.jsx
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-form">
      <h3>Cari & Filter Game</h3>
      <div className="form-group">
        <label htmlFor="search-input">Cari Judul Game:</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="e.g. Grand Theft Auto"
          // CPMK0501: HTML5 Validation
          required
          minLength="2"
        />
      </div>

      <div className="form-group platform-group">
        <label>Filter Platform (Checkbox):</label>
        <div className="checkbox-container">
          {PLATFORMS.map((platform) => (
            <div key={platform.id}>
              <input
                type="checkbox"
                id={`platform-${platform.id}`}
                checked={selectedPlatforms.includes(platform.id)}
                onChange={() => onPlatformToggle(platform.id)}
              />
              <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group sort-group">
        <label htmlFor="sort-select">Urutkan Berdasarkan (Dropdown):</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button">
        Terapkan Filter & Cari
      </button>
    </form>
  );
}

export default SearchForm;
