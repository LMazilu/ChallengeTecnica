import { Request, Response } from "express";
import { CreateUserDto } from "src/dtos/CreateUser.dto";
import { CreateUserQueryParams } from "src/types/query-params";
import { User } from "src/types/response";

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

export function createUser(
  req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  res: Response<User>
) {
  const { username, email, password } = req.body;
  const a = req.query.loginAfterCreate;
  return res.status(200).send({ id: "1", username, email });
}

export function getUsersById(req: Request, res: Response) {
  res.send(
    "User with id " + req.params.id + " is " + (req.user ?? "not found")
  );
}

export function updateUser(req: Request, res: Response) {
  res.send("Update User " + req.params.id);
}

export function deleteUser(req: Request, res: Response) {
  res.send("User " + req.params.id + " deleted");
}
