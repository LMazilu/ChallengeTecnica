import express, { Express, NextFunction, Request, Response } from "express";
import userRouter from "./routes/users";
import { loggingHandler } from "./middlewares/loggingHandler";
import { corsHandler } from "./middlewares/corsHandler";
import { apiNotFound } from "./middlewares/apiNotFound";
import path from "path";
import "./config/logging";
import { loginUser } from "./services/authService";
import { auth } from "./middlewares/cookieJwtAuth";
import cors from "cors";

// Configurazione iniziale
const app: Express = express();

app
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .set("layout", "layouts/layout");

app
  .use(express.static(path.join(__dirname, "public")))
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.use(loggingHandler);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(corsHandler);

// Import delle routes
app.use("/users", auth, userRouter);

// Routes di base per la landing page
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render("welcome");
});

app.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});

app.post("/login", loginUser);

app.use(apiNotFound);

// Inizializzazione del server
const port = process.env.SERVER_PORT ?? 3030;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
