import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [liked, setLiked] = useState(false);

  const handleFavorite = async () => {
    if (!user) {
      alert("Please login to save favorites");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/favorites", {
        user_id: user.id,
        recipe_id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      setLiked(true);
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite");
    }
  };

  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="card-title">{recipe.title}</h3>
          {user && (
            <button
              className={liked ? "heart-btn filled" : "heart-btn"}
              onClick={handleFavorite}
              title="Add to favorites"
            >
              ♥
            </button>
          )}
        </div>
        <span className="badge">ID: {recipe.id}</span>
        <Link to={`/recipe/${recipe.id}`} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          View details →
        </Link>
      </div>
    </div>
  );
}
