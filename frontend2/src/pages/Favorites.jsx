import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadFav = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/favorites", {
        params: { user_id: user.id },
      });
      setFav(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFav();
  }, []);

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${id}`);
      loadFav();
    } catch (err) {
      console.error(err);
      alert("Failed to remove");
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        <h2>Please login to view your favorites.</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <h1>Your favorites</h1>
      {loading ? (
        <p style={{ marginTop: "1rem" }}>Loading...</p>
      ) : fav.length === 0 ? (
        <p style={{ marginTop: "1rem", color: "#6b7280" }}>
          You don't have any favorites yet. Add some from the search results.
        </p>
      ) : (
        <div className="grid">
          {fav.map((f) => (
            <div className="card" key={f.id}>
              <img src={f.image} alt={f.title} />
              <div className="card-body">
                <h3 className="card-title">{f.title}</h3>
                <button className="btn btn-outline" onClick={() => remove(f.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
