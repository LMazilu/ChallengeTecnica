import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users";
import { loggingHandler } from "./middlewares/loggingHandler";
import path from "path";
import "./config/logging";

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

// Import delle routes
app.use("/users", userRouter);

// Routes di base per la landing page
app.get("/", (req: Request, res: Response) => {
  // res.render("index");
  res.render("welcome");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Inizializzazione del server
const port = process.env.SERVER_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
