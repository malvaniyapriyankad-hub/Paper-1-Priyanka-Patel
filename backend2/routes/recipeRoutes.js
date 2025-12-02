import express from "express";
import { searchRecipes, recipeDetails } from "../controllers/recipeController.js";

const router = express.Router();

router.get("/search", searchRecipes);
router.get("/:id", recipeDetails);

export default router;
