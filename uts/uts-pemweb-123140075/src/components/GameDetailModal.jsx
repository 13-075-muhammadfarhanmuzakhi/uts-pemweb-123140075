import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = "https://api.rawg.io/api/games";

function GameDetailModal({ gameId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // CPMK0502: useState dan useEffect untuk Fetch Detail
  useEffect(() => {
    if (!gameId) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        // API Integration: Fetch data dari API
        const response = await axios.get(`${API_URL}/${gameId}`, {
          params: { key: API_KEY },
        });
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching game detail:", error);
        // API Integration: Error Handling
        alert("Gagal memuat detail game. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [gameId]);

  if (!gameId) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {loading && <p>Memuat detail game...</p>}

        {/* CPMK0502: Conditional Rendering untuk menampilkan konten */}
        {detail && (
          <div>
            {/* CPMK0502: Template Literals dan Destructuring digunakan di App.jsx */}
            <h2>{detail.name}</h2>

            <div className="detail-header">
              <img
                src={detail.background_image}
                alt={detail.name}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div className="detail-info">
              <p>
                <strong>Genre:</strong>{" "}
                {detail.genres.map((g) => g.name).join(", ")}
              </p>
              <p>
                <strong>Deskripsi:</strong>
              </p>
              {/* Menampilkan deskripsi (dibatasi agar tidak terlalu panjang) */}
              <p className="description-text">
                {detail.description_raw
                  ? detail.description_raw.substring(0, 300) + "..."
                  : "N/A"}
              </p>

              <p>
                <strong>Platform:</strong>{" "}
                {detail.platforms.map((p) => p.platform.name).join(", ")}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={detail.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {detail.website}
                </a>
              </p>
            </div>

            {/* Hanya menampilkan 3 screenshot pertama */}
            {detail.screenshots && detail.screenshots.length > 0 && (
              <div className="screenshot-grid">
                <h4>Screenshot</h4>
                {detail.screenshots.slice(0, 3).map((s, index) => (
                  <img
                    key={index}
                    src={s.image}
                    alt={`Screenshot ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetailModal;
