import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users";

const app: Express = express();
import expressLayouts from "express-ejs-layouts";

app
  .set("view engine", "ejs")
  .set("layout", "layouts/layout")
  .set("views", __dirname + "/views");
app
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(expressLayouts);

app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("index", { world: "World" });
});

let port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
