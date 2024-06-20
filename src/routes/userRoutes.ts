import { Router } from "express";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserProfileByIdHandler,
  getUserProfileHandler,
  updateUserHandler,
} from "../controllers/userController";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 * Inizio routes
 */

// Rotta per ottenere il profilo dell'utente autenticato
router.get("/profile", auth, getUserProfileHandler);

router.get("/:id", auth, getUserProfileByIdHandler);

router.get("/", auth, getAllUsersHandler);

router.post("/", auth, updateUserHandler);

router.delete("/:id", auth, deleteUserHandler);

export default router;
