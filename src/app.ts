import express, { Express, NextFunction, Request, Response } from "express";
import userRouter from "./routes/users";
import { loggingHandler } from "./middlewares/loggingHandler";
import { apiNotFound } from "./middlewares/apiNotFound";
import path from "path";
import "./config/logging";
import { auth } from "./middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import voucherRoutes from "./routes/voucherRoutes";
import { initializeDefaultUsers } from "./services/authService";
import helmet from "helmet";

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
app.use(cookieParser());
app.use(helmet);
app.use(
  cors({
    origin: "http://localhost:"+process.env.CLIENT_PORT,
    credentials: true,
  })
);

// Inizializza gli utenti predefiniti
initializeDefaultUsers().catch(err => {
  throw new Error("Errore durante l'inizializzazione degli utenti predefiniti: " + err);
  process.exit(1); // Esci dall'applicazione se non riesci ad inizializzare gli utenti
});

// Import delle routes
app.use("/users", auth, userRouter);
app.use("/auth", authRoutes);
app.use("/vouchers", voucherRoutes);

// Routes di base per la landing page
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render("welcome");
});

app.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});

app.use(apiNotFound);
app.use(errorHandler);

// Inizializzazione del server
const port = process.env.SERVER_PORT ?? 3030;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
