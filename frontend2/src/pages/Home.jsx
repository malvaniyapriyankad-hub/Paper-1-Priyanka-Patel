import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [type, setType] = useState("");
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(saved);
  }, []);

  const saveRecent = (term) => {
    if (!term) return;
    let list = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    list = [term, ...list.filter((x) => x !== term)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(list));
    setRecent(list);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/recipes/search", {
        params: { query, cuisine, diet, maxTime, type },
      });
      setRecipes(data);
      saveRecent(query);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Find your next recipe</h1>
      <p className="tagline">Search by name and refine using cuisine, diet, and cooking time filters.</p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="input"
          placeholder="Search recipes (e.g., pasta, salad, curry)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="filters">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Cuisine</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
        </select>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Diet</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
        </select>
        <select value={maxTime} onChange={(e) => setMaxTime(e.target.value)}>
          <option value="">Max Time</option>
          <option value="15">≤ 15 min</option>
          <option value="30">≤ 30 min</option>
          <option value="60">≤ 60 min</option>
        </select>
      </div>

      {recent.length > 0 && (
        <div className="recent-searches">
          Recent:{" "}
          {recent.map((r) => (
            <span key={r} className="recent-chip" onClick={() => handleRecentClick(r)}>
              {r}
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <p style={{ marginTop: "2rem" }}>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p style={{ marginTop: "2rem", color: "#6b7280" }}>
          No recipes yet. Try searching for something like "pasta" or "paneer".
        </p>
      ) : (
        <div className="grid">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
