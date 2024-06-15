import { Request, Response } from "express";

interface CustomRequest2 extends Request {
  user?: {
    name: string;
  };
}

export function getUsers(req: Request, res: Response) {
  res.send("Users List");
}

export function newUser(req: Request, res: Response) {
  res.render("users/new");
}

const mockUsers = [
  { name: "Kyle" },
  { name: "James" },
  { name: "John" },
  { name: "Paul" },
];

export function createUser(req: Request, res: Response) {
  let isValid = false;
  if (isValid) {
    mockUsers.push({ name: req.body.firstName });
    res.redirect("/users" + (mockUsers.length - 1));
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
}

export function getUsersById(req: CustomRequest2, res: Response) {
  res.send("User with id " + req.params.id + " is " + (req.user?.name ?? "not found"));
}

export function updateUser(req: Request, res: Response) {
  res.send("Update User " + req.params.id);
}

export function deleteUser(req: Request, res: Response) {
  res.send("User " + req.params.id + " deleted");
}
