import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", removeFavorite);

export default router;
