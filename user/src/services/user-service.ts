import * as userRepository from "../database/repositories/user-repository";
import type { IUser } from "../database/models/User";

export async function createUser(userData: IUser) {
  if (
    userData.username &&
    userData.email &&
    userData.password &&
    userData.role
  ) {
    const user = await userRepository.getUserByUsername(userData.username);

    const email = await userRepository.getUserByEmail(userData.email);
    if (user) {
      throw new Error("Username already exists");
    }
    if (email) {
      throw new Error("This email is registered by another user");
    }
  } else {
    throw new Error("Please provide all the required fields");
  }

  return await userRepository.createUser(userData);
}

//check if the user already exists
export async function deleteUser(userId: string) {
  return await userRepository.deleteUser(userId);
}

//get specific user by username
export async function getUserByUsername(
  username: string,
): Promise<IUser | null> {
  return await userRepository.getUserByUsername(username);
}

//get specific user by id
export async function getUserById(userId: string): Promise<IUser | null> {
  return await userRepository.getUserById(userId);
}

//get specific user by email
export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await userRepository.getUserByEmail(email);
}

//get all users
export async function getAllUsers(): Promise<IUser[] | null> {
  return await userRepository.getAllUsers();
}

//update user and searching for the user using it username
export async function updateUserByUsername(
  username: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await userRepository.updateUserByUsername(username, updatedUser);
}

//update user and searching for the user using it id
export async function updateUserById(
  userId: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await userRepository.updateUserById(userId, updatedUser);
}
