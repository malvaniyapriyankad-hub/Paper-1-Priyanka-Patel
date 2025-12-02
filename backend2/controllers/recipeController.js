import axios from "axios";

const API_URL = "https://api.spoonacular.com/recipes";
const API_KEY = process.env.SPOONACULAR_KEY || "YOUR_SPOONACULAR_KEY";

export const searchRecipes = async (req, res) => {
  try {
    const { query, cuisine, diet, maxTime, type } = req.query;

    const params = {
      apiKey: API_KEY,
      query: query || "",
      number: 10,
    };

    if (cuisine) params.cuisine = cuisine;
    if (diet) params.diet = diet;
    if (maxTime) params.maxReadyTime = maxTime;
    if (type) params.type = type;

    const { data } = await axios.get(`${API_URL}/complexSearch`, { params });

    res.json(data.results || []);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

export const recipeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(`${API_URL}/${id}/information`, {
      params: { apiKey: API_KEY }
    });

    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
};
