const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
    console.log(req.query.name);
  res.send("Users List");
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  let isValid = false;
  if (isValid) {
    mockUsers.push({ name: req.body.firstName });
    res.redirect("/users" + (mockUsers.length - 1));
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    res.send("User " + (req.user?.name || "not found"));
  })
  .put((req, res) => {
    res.send("Update User " + req.params.id);
  })
  .delete((req, res) => {
    res.send("User " + req.params.id + " deleted");
  });

const mockUsers = [
  { name: "Kyle" },
  { name: "James" },
  { name: "John" },
  { name: "Paul" },
];
router.param("id", (req, res, next, id) => {
  req.user = mockUsers[id];
  next();
});

module.exports = router;

//Middlewares
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
