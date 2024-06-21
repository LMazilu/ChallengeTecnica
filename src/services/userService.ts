import { User, getAllUsers, getUserById, getUserByUsername } from "../models/user";

/**
 * Retrieves the user profile based on the provided username.
 *
 * @param {string} username - The username of the user.
 * @return {Promise<User>} A promise that resolves to the user profile if found, or throws an error if the user is not found.
 */
export const getUserProfile = async (username: string): Promise<User> => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * Retrieves the user profile based on the provided ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @return {Promise<User>} A Promise that resolves to the user object if found, or throws an error if the user is not found.
 */
export const getUserProfileById = async (id: number): Promise<User> => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

/**
 * Retrieves a list of all users from the database.
 *
 * @return {Promise<User[]>} A promise that resolves to an array of User objects representing all users in the database.
 */
export const getAllUsersList = async (): Promise<User[]> => {
  return await getAllUsers();
}