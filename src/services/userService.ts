import { User, getAllUsers, getUserById, getUserByUsername } from "../models/user";

export const getUserProfile = async (username: string): Promise<User> => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getUserProfileById = async (id: number): Promise<User> => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export const getAllUsersList = async (): Promise<User[]> => {
  return await getAllUsers();
}