import db from "../config/db.js";

export const addFavorite = async (req, res) => {
  try {
    const { user_id, recipe_id, title, image } = req.body;
    if (!user_id || !recipe_id || !title) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await db.execute(
      "INSERT INTO favorites (user_id, recipe_id, title, image) VALUES (?, ?, ?, ?)",
      [user_id, recipe_id, title, image || ""]
    );

    res.json({ message: "Added to favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: "user_id required" });

    const [rows] = await db.execute(
      "SELECT * FROM favorites WHERE user_id = ? ORDER BY id DESC",
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM favorites WHERE id = ?", [id]);
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
