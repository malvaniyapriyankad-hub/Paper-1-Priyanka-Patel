import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleFavorite = async () => {
    if (!user || !data) {
      alert("Login first to save favorites");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/favorites", {
        user_id: user.id,
        recipe_id: data.id,
        title: data.title,
        image: data.image,
      });
      alert("Added to favorites");
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite");
    }
  };

  if (loading || !data) {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        {loading ? "Loading recipe..." : "No data"}
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        <img
          src={data.image}
          alt={data.title}
          style={{ width: "320px", borderRadius: "1rem", objectFit: "cover" }}
        />
        <div style={{ flex: 1, minWidth: "260px" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>{data.title}</h1>
          <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
            Ready in {data.readyInMinutes} minutes · Serves {data.servings}
          </p>
          <button className="btn" onClick={handleFavorite}>
            Save to favorites
          </button>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Ingredients</h2>
        <ul style={{ paddingLeft: "1.2rem" }}>
          {data.extendedIngredients?.map((i) => (
            <li key={i.id}>{i.original}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Instructions</h2>
        {data.instructions ? (
          <div dangerouslySetInnerHTML={{ __html: data.instructions }} />
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
    </div>
  );
}
