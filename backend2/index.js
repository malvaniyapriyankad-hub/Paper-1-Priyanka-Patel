// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import recipeRoutes from "./routes/recipeRoutes.js";
// import favoriteRoutes from "./routes/favoriteRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Recipe Finder Backend API");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/recipes", recipeRoutes);
// app.use("/api/favorites", favoriteRoutes);

// app.listen(PORT, () => {
//   console.log(`Backend server running on port ${PORT}`);
// });


// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"; // this ensures DB connects
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe Finder Backend is running ✅");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
