import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users";
import dotenv from "dotenv";

// Configurazione iniziale
const app: Express = express();
import path from "path";
dotenv.config();

app
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .set("layout", "layouts/layout");

app
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

// Import delle routes
app.use("/users", userRouter);

// Routes di base per la landing page
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

// Inizializzazione del server
const port = process.env.SERVER_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
