import React from "react";

function GameCard({ game, onClick }) {
  // CPMK0502: Destructuring used here
  const { name, background_image, rating, released } = game;

  const formattedRating = rating.toFixed(2);

  return (
    // CPMK0502: Event Handling
    <div className="game-card" onClick={() => onClick(game.id)}>
      {/* Gambar Cover */}
      <div className="card-image">
        <img
          src={background_image}
          alt={`Cover of ${name}`}
          // CPMK0502: Conditional Rendering untuk placeholder image
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>

      <div className="card-content">
        {/* Title */}
        {/* CPMK0501: Selector Kombinasi/Pseudo-class di CSS akan menargetkan elemen ini */}
        <h4 className="game-title">{name}</h4>

        {/* Rating dan Release Date */}
        <p>
          ⭐ **Rating:**{" "}
          <span className="highlight-text">{formattedRating}</span>
        </p>
        <p>🗓️ **Rilis:** {released}</p>
      </div>
    </div>
  );
}

export default GameCard;
