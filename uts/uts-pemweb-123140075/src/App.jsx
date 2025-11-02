import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
// Mengimpor 3 komponen baru untuk memenuhi minimal 4 components
import SearchForm from "./components/SearchForm";
import GameCard from "./components/GameCard";
import GameDetailModal from "./components/GameDetailModal";

// CPMK0502: Arrow function
const App = () => {
  // CPMK0502: useState Hook untuk State Management
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Array of Platform IDs
  const [sortOption, setSortOption] = useState("-rating"); // Default sort by highest rating
  const [selectedGameId, setSelectedGameId] = useState(null); // For detail modal

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const API_URL = "https://api.rawg.io/api/games";

  // CPMK0502: Modern JavaScript - useCallback dan Arrow Function
  const fetchGames = useCallback(async () => {
    if (!API_KEY) {
      alert("API Key tidak ditemukan di Environment Variables (.env file)!");
      return;
    }

    // API Integration: Loading State
    setLoading(true);

    // Filter Logic: Join platform IDs by comma for API parameter
    // CPMK0502: Array Method (join)
    const platformIds = selectedPlatforms.join(",");

    try {
      // API Integration: Fetch data dari API
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          search: searchTerm,
          platforms: platformIds, // Filter Platform
          ordering: sortOption, // Sort Option
          page_size: 20,
        },
      });

      // CPMK0502: Data Transformation (mapping to new structure not strictly required, but done implicitly)
      setGames(response.data.results);
    } catch (error) {
      console.error("Gagal mengambil data game:", error);
      // API Integration: Error Handling
      alert(
        "Terjadi kesalahan saat mengambil data. Cek koneksi atau API Key Anda."
      );
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, searchTerm, selectedPlatforms, sortOption]); // Dependensi

  // CPMK0502: useEffect Hook - Jalankan fetch saat komponen pertama dimuat & saat filter/sort berubah
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Logic untuk Platform Checkbox
  const handlePlatformToggle = (platformId) => {
    // CPMK0502: Array Method (includes, filter, spread operator)
    setSelectedPlatforms(
      (prev) =>
        prev.includes(platformId)
          ? prev.filter((id) => id !== platformId) // Hapus jika sudah ada
          : [...prev, platformId] // Tambahkan jika belum ada
    );
  };

  // Logic Modal
  const handleOpenDetail = (gameId) => {
    setSelectedGameId(gameId);
  };

  const handleCloseDetail = () => {
    setSelectedGameId(null);
  };

  return (
    <div className="app-container">
      {/* CPMK0502: Semantic Tags (Div, Header, Main) */}
      <header className="app-header">
        <h1>🎮 FRHN Game Database Explorer</h1>
        <p>
          Studi Kasus UTS Pemrograman Aplikasi Web - Muhammad Farhan Muzakhi
          123140075
        </p>
      </header>

      <main className="main-content">
        <SearchForm
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onSubmitSearch={fetchGames} // Memicu ulang fetch saat tombol cari diklik
        />

        <hr className="divider" />

        <h2>Hasil Pencarian ({games.length} Game Ditemukan)</h2>

        {loading && <p className="loading-state">Loading data...</p>}

        {/* CPMK0502: Conditional Rendering */}
        {!loading && games.length === 0 && (
          <p className="no-result">
            Tidak ditemukan game sesuai kriteria pencarian.
          </p>
        )}

        {/* Fitur Wajib 3: Grid Game */}
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={handleOpenDetail} />
          ))}
        </div>
      </main>

      {/* Fitur Wajib 4: Detail Game Modal (Conditional Rendering) */}
      {selectedGameId && (
        <GameDetailModal gameId={selectedGameId} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default App;
