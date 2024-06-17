import { NextFunction, Request, Response, Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUsersById,
  newUser,
  updateUser
} from "../handlers/users";
const router = Router();

/**
 * Request custom per alcuni test, avrò i models dopo
 */

interface CustomRequest2 extends Request {
  user?: {
    name: string;
  };
}

router.use(logger);

/**
 * Inizio routes
 */
router.get("/", getUsers);

router.get("/new", newUser);

router.post("/", createUser);

router.route("/:id").get(getUsersById).put(updateUser).delete(deleteUser);

const mockUsers = [
  { name: "Kyle" },
  { name: "James" },
  { name: "John" },
  { name: "Paul" },
];

router.param("id", (req: CustomRequest2, res: Response, next, id) => {
  req.user = mockUsers[id];
  next();
});

/**
 * Logga l'URL originale della richiesta e chiama la successiva funzione middleware.
 *
 * @param {Request} req - L'oggetto della richiesta.
 * @param {Response} res - L'oggetto della risposta.
 * @param {() => void} next - La successiva funzione middleware.
 * @return {void} Questa funzione non restituisce nulla.
 */
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  next();
}

export default router;
