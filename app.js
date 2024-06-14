const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app
  .set("view engine", "ejs")
  .set("layout", "layouts/layout")
  .set("views", __dirname + "/views");
app
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json)
  .use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", { world: "World" });
});

app.listen(process.env.PORT || 3000);

const userRouter = require("routes/users");
app.use("/users", userRouter);
