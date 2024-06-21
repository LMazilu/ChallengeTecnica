import express, { Express, NextFunction, Request, Response } from "express";
import { loggingHandler } from "./middlewares/loggingHandler";
import { apiNotFound } from "./middlewares/apiNotFound";
import path from "path";
import "./config/logging";
import { auth } from "./middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import voucherRoutes from "./routes/voucherRoutes";
import helmet from "helmet";
import { initialize } from "./models/init";
import userRoutes from "./routes/userRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";

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
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:" + process.env.CLIENT_PORT,
    credentials: true,
  })
);

// Import delle routes
app.use("/users", auth, userRoutes);
app.use("/auth", authRoutes);
app.use("/vouchers", voucherRoutes);
app.use("/purchases", auth, purchaseRoutes);

// Routes di base temporanee per la landing page fino al rilascio del frontend
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

// Inizializza il database e i default users prima di avviare il server
initialize()
  .then(() => {
    console.log("Database and default users initialized successfully");
    // Avvia il server solo dopo che il database e i default users sono stati inizializzati
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database and default users:", error);
    process.exit(1); // Termina il processo se l'inizializzazione fallisce
  });
